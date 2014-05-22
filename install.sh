#!/bin/bash

version="v0.10.2"

mkdir ~/Spotify ; cd ~/Spotify
rm -rf rama-spotify
rm -rf rama
rm rama_"$version".tar.gz
curl -L -O https://github.com/carsy/rama-spotify/releases/download/"$version"/rama_"$version".tar.gz
tar -xf rama_"$version".tar.gz

unamestr=`uname`
if [[ "$unamestr" == 'Drawin' ]]; then
   open spotify:app:rama
elif [[ "$unamestr" == 'Linux' ]]; then
   xdg-open spotify:app:rama
fi
