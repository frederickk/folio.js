#!/bin/bash

# Paper.js - The Swiss Army Knife of Vector Graphics Scripting.
# http://paperjs.org/
#
# Copyright (c) 2011 - 2013, Juerg Lehni & Jonathan Puckey
# http://lehni.org/ & http://jonathanpuckey.com/
#
# Distributed under the MIT license. See LICENSE file for details.
#
# All rights reserved.

# Generate documentation
#
# MODE:
#	docs			Generates the JS API docs - Default


MODE="docs"

cd jsdoc-toolkit
java -jar jsrun.jar app/run.js -c=conf/$MODE.conf -D="renderMode:$MODE"
cd ..