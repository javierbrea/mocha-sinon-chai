# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/) 
and this project adheres to [Semantic Versioning](http://semver.org/).

## [unreleased]
### Added
### Changed
### Fixed
### Removed

## [3.0.0] - 2018-08-11
### Changed
- Upgrade istanbul version.

## [2.8.0] - 2018-08-11
### Added
- Avoid publishing .github folder into npm distribution.

## [2.7.0] - 2018-08-11
### Changed
- Upgrade sinon version to 6.1.5.

### Added
- Add community standards.

## [2.6.0] - 2018-06-18
### Changed
- Upgrade sinon-chai version to version 3.2.0, which provides support for Sinon v6.x.

## [2.5.0] - 2018-06-17
### Added
- Expose chai "assert" method

### Changed
- Upgrade sinon version to 6.0.0.

### Fixed
- Avoid npm distribution of unneeded files.

## [2.4.0] - 2018-06-02
### Changed
- Upgrade sinon and sinon-chai versions.

## [2.3.0] - 2018-05-20
### Changed
- Upgrade Mocha version. (Waiting to upgrade Sinon until sinon-chai is compatible with Sinon 5)

### Fixed
- Fix sonarcloud badge url.

## [2.2.0] - 2018-04-25
### Added
- Add option to runner that allows to set custom environment variables.

### Changed
- Upgrade Mocha version.

## [2.1.0] - 2018-04-10
### Changed
- Upgrade sinon version.

### Fixed
- Fix istanbul and mocha execution on Windows environments. Change the execution method, use child_process.fork and use javasccript sources directly instead of binaries.

## [2.0.0] - 2018-04-08
### Added
- Add binary files to allow launch tests and coverage in an easy way using npm commmand.
- Expose programmatic runner used by the "mocha-sinon-chai" binary.

## [1.1.0] - 2018-03-30
### Changed
- Upgraded dependencies.

## [1.0.0] - 2018-03-28
### Added
- First package version.
