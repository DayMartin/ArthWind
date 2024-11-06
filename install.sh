#!/bin/bash
green=`tput setaf 2`
reset=`tput sgr0`

echo ""
echo "${green}--------------------install frontend--------------------${reset}"
echo ""
cd frontend && yarn

echo ""
echo "${green}--------------------install backend--------------------${reset}"
echo ""
cd banda-arth-wind && yarn
