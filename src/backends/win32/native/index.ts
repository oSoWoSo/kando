//////////////////////////////////////////////////////////////////////////////////////////
//   _  _ ____ _  _ ___  ____                                                           //
//   |_/  |__| |\ | |  \ |  |    This file belongs to Kando, the cross-platform         //
//   | \_ |  | | \| |__/ |__|    pie menu. Read more on github.com/kando-menu/kando     //
//                                                                                      //
//////////////////////////////////////////////////////////////////////////////////////////

// SPDX-FileCopyrightText: Simon Schneegans <code@simonschneegans.de>
// SPDX-License-Identifier: MIT

export interface Native {
  /**
   * This uses Win32 API calls to get the name and the class of the currently focused
   * application window.
   */
  getActiveWindow(): { wmClass: string; name: string };

  /**
   * This simulates a mouse movement.
   *
   * @param dx The horizontal movement in pixels.
   * @param dy The vertical movement in pixels.
   */
  movePointer(dx: number, dy: number): void;

  /**
   * This simulates a key press or release.
   *
   * @param name The name of the key to simulate.
   * @param down If true, a key press is simulated. Otherwise, a key release is simulated.
   */
  simulateKey(name: string, down: boolean): void;
}

const native: Native = require('./../../../../build/Release/NativeWin32.node');

export { native };
