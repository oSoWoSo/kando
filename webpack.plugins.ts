// SPDX-FileCopyrightText: Simon Schneegans <code@simonschneegans.de>
// SPDX-License-Identifier: CC0-1.0

import os from 'os';
import { NormalModuleReplacementPlugin, DefinePlugin } from 'webpack';
import CopyPlugin from 'copy-webpack-plugin';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const plugins: any[] = [
  // We do not need the otf, ttf, eot and woff files of the SimpleIcons package. They are
  // replaced by the woff2 file below. Maybe there is a more elegant way to do this, but
  // this works for now.
  new NormalModuleReplacementPlugin(
    /SimpleIcons\.(otf|ttf|eot|woff)$/,
    'SimpleIcons.woff2'
  ),
  // We use this in order to know in the renderer process which operating system we are
  // running on.
  new DefinePlugin({
    // output from process.platform is the same as os.platform()
    cIsMac: process.platform === 'darwin',
    cIsWindows: process.platform === 'win32',
    cIsLinux: process.platform === 'linux',
  }),
];

// The macOS tray icons are loaded dynamically, so we copy them directly to the output
// directory.
if (os.platform() === 'darwin') {
  plugins.push(
    new CopyPlugin({
      patterns: [{ from: 'trayTemplate*.png', to: 'assets/', context: 'assets/icons/' }],
    })
  );
}

// Some resources are not bundled with webpack. We copy them to the output directory.
plugins.push(
  new CopyPlugin({
    patterns: [
      { from: 'menu-themes', to: 'assets/menu-themes', context: 'assets/' },
      { from: 'locales', to: '../main/locales' },
    ],
  })
);
