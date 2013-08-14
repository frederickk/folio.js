#!/bin/sh

# Usage:
# build.sh

if [ "$1" == "scriptographer" ];
then
	echo "scriptographer"
	ant -buildfile build-scriptographer.xml
elif [ "$1" == "paper" ];
then
	echo "paper.js"
	ant -buildfile build.xml
else
	# default all
	ant -buildfile build.xml
	ant -buildfile build-scriptographer.xml
fi
