# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/) 
and this project adheres to [Semantic Versioning](http://semver.org/).

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
