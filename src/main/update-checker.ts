//////////////////////////////////////////////////////////////////////////////////////////
//   _  _ ____ _  _ ___  ____                                                           //
//   |_/  |__| |\ | |  \ |  |    This file belongs to Kando, the cross-platform         //
//   | \_ |  | | \| |__/ |__|    pie menu. Read more on github.com/kando-menu/kando     //
//                                                                                      //
//////////////////////////////////////////////////////////////////////////////////////////

// SPDX-FileCopyrightText: Simon Schneegans <code@simonschneegans.de>
// SPDX-License-Identifier: MIT

import { EventEmitter } from 'events';
import { app } from 'electron';
import { Octokit } from 'octokit';

/**
 * Checking for updates works the following way: Whenever a menu is opened, we check for a
 * new version. We skip the check if another check was made less than one hour ago or if a
 * previous check showed that a new version is actually available.
 *
 * This class is an event emitter which emits the following events:
 *
 * @fires update-available - This event is emitted when a new version of Kando is
 *   available. This event is only emitted once per app start.
 */
export class UpdateChecker extends EventEmitter {
  /**
   * This is set to true once a new version was found. No further checks will be made
   * until the app is restarted.
   */
  private updateAvailable = false;

  /** The time we last checked for updates. */
  private lastCheck = 0;

  /**
   * This method checks for updates. If a new version is available, an 'update-available'
   * event is emitted. This method will not check for updates if another check was made
   * less than one hour ago or if a previous check showed that a new version is
   * available.
   */
  public async checkForUpdates() {
    if (this.updateAvailable) {
      return;
    }

    const now = Date.now();
    if (now - this.lastCheck < 60 * 60 * 1000) {
      return;
    }
    this.lastCheck = now;

    this.isUpdateAvailable()
      .then((isUpdateAvailable) => {
        if (isUpdateAvailable) {
          this.updateAvailable = true;
          this.emit('update-available');
        } else {
          console.log('You are running the latest version of Kando.');
        }
      })
      .catch(() => {
        console.log('Failed to check for updates. We will retry this later again.');
      });
  }

  /**
   * This will query the latest non-prerelease version of Kando from GitHub via the GitHub
   * API (https://api.github.com/repos/kando-menu/kando/releases). If a newer version is
   * available, this method will return true. If the user is already using the latest
   * version, this method will return false. If the method fails to query the GitHub API,
   * an exception is thrown.
   */
  private async isUpdateAvailable() {
    const octokit = new Octokit();

    const response = await octokit.request('GET /repos/{owner}/{repo}/releases', {
      owner: 'kando-menu',
      repo: 'kando',
      headers: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'X-GitHub-Api-Version': '2022-11-28',
      },
    });

    if (response?.data?.length > 0) {
      for (const release of response.data) {
        if (!release.prerelease) {
          // Strip leading 'v' from version string and split into parts.
          const latestVersion = release.tag_name.substring(1).split('.').map(Number);
          const currentVersion = app.getVersion().split('.').map(Number);

          // Compare version numbers.
          for (let i = 0; i < 3; i++) {
            if (latestVersion[i] > currentVersion[i]) {
              return true;
            } else if (latestVersion[i] < currentVersion[i]) {
              break;
            }
          }

          return false;
        }
      }
    }

    throw new Error('Failed to retrieve latest version information from GitHub.');
  }
}
