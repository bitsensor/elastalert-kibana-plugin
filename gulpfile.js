var gulp = require('gulp');
var _ = require('lodash');
var path = require('path');
var mkdirp = require('mkdirp');
var Rsync = require('rsync');
var Promise = require('bluebird');
var eslint = require('gulp-eslint');
var rimraf = require('rimraf');
var zip = require('gulp-zip');
var fs = require('fs');
var spawn = require('child_process').spawn;
var minimist = require('minimist');

var pkg = require('./package.json');
var packageName = pkg.name  + '-' + pkg.version;

var buildDir = path.resolve(__dirname, 'build');
var targetDir = path.resolve(__dirname, 'target');
var buildTarget = path.resolve(buildDir, packageName);

var include = [
  'package.json',
  'index.js',
  'public'
];

var knownOptions = {
  string: 'kibanahomepath',
  default: { kibanahomepath: 'kibana' }
};
var options = minimist(process.argv.slice(2), knownOptions);

var kibanaPluginDir = path.resolve(__dirname, options.kibanahomepath + '/installedPlugins/' + pkg.name);


function syncPluginTo(dest, done) {
  mkdirp(dest, function (err) {
    if (err) return done(err);
    Promise.all(include.map(function (name) {
      var source = path.resolve(__dirname, name);
      return new Promise(function (resolve, reject) {
        var rsync = new Rsync();
        rsync
          .source(source)
          .destination(dest)
          .flags('uav')
          .recursive(true)
          .set('delete')
          .output(function (data) {
            process.stdout.write(data.toString('utf8'));
          });
        rsync.execute(function (err) {
          if (err) {
            console.log(err);
            return reject(err);
          }
          resolve();
        });
      });
    }))
    .then(function () {
      return new Promise(function (resolve, reject) {
        mkdirp(path.join(buildTarget, 'node_modules'), function (err) {
          if (err) return reject(err);
          resolve();
        });
      });
    })
    .then(function () {
      spawn('npm', ['install', '--production'], {
        cwd: dest,
        stdio: 'inherit'
      })
      .on('close', done);
    })
    .catch(done);
  });
}

gulp.task('sync', function (done) {
  syncPluginTo(kibanaPluginDir, done);
});

gulp.task('lint', function (done) {
  return gulp.src([
    'public/**/*.js',
    '!**/webpackShims/**'
  ]).pipe(eslint())
    .pipe(eslint.formatEach())
    .pipe(eslint.failOnError());
});

gulp.task('lintFix', function (done) {
  return gulp.src([
    'public/**/*.js',
    '!**/webpackShims/**'
  ]).pipe(eslint({
    fix: true
  }))
  .pipe(eslint.formatEach())
  .pipe(eslint.failOnError());
});

gulp.task('clean', function (done) {
  Promise.each([buildDir, targetDir], function (dir) {
    return new Promise(function (resolve, reject) {
      rimraf(dir, function (err) {
        if (err) return reject(err);
        resolve();
      });
    });
  }).nodeify(done);
});

gulp.task('build', ['clean'], function (done) {
  syncPluginTo(buildTarget, done);
});

gulp.task('package', ['build'], function (done) {
  return gulp.src([
      path.join(buildDir, '**', '*'),
      '!**/node_modules/vis/examples/**',
      '!**/node_modules/vis/docs/**'
    ])
    .pipe(zip(packageName + '.zip'))
    .pipe(gulp.dest(targetDir));
});

gulp.task('dev', ['sync'], function (done) {
  gulp.watch([
    'package.json',
    'index.js',
    'public/**/*',
    'server/**/*'
  ], ['sync', 'lint']);
});

gulp.task('test', ['sync'], function(done) {
  spawn('grunt', ['test:browser', '--grep=Kibi Timeline'], {
    cwd: options.kibanahomepath,
    stdio: 'inherit'
  }).on('close', done);
});

gulp.task('testdev', ['sync'], function(done) {
  spawn('grunt', ['test:dev', '--browser=Chrome'], {
    cwd: options.kibanahomepath,
    stdio: 'inherit'
  }).on('close', done);
});

gulp.task('coverage', ['sync'], function(done) {
  spawn('grunt', ['test:coverage', '--grep=Kibi Timeline'], {
    cwd: options.kibanahomepath,
    stdio: 'inherit'
  }).on('close', done);
});
