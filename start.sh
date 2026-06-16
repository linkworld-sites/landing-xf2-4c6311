#!/usr/bin/env bash
cd "$(dirname "$0")"
export NODE_ENV=production
exec npm start
