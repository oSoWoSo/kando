//////////////////////////////////////////////////////////////////////////////////////////
//   _  _ ____ _  _ ___  ____                                                           //
//   |_/  |__| |\ | |  \ |  |    This file belongs to Kando, the cross-platform         //
//   | \_ |  | | \| |__/ |__|    pie menu. Read more on github.com/menu/kando           //
//                                                                                      //
//////////////////////////////////////////////////////////////////////////////////////////

// SPDX-FileCopyrightText: Simon Schneegans <code@simonschneegans.de>
// SPDX-License-Identifier: MIT

import { matchSorter } from 'match-sorter';

import { IIconTheme } from '../icon-theme-registry';

/**
 * This class implements an icon theme that uses the symbolic icons from GNOME.
 * https://gitlab.gnome.org/Teams/Design/icon-development-kit
 */
export class GNOMEIconTheme implements IIconTheme {
  /**
   * This array contains all icons and their descriptions. Each inner array contains the
   * icon itself as first element and all aliases as following elements.
   */
  private icons: Array<Array<string>> = [];

  constructor() {
    // Load gnome-icons.json as JSON.
    const iconNames = require('../../../assets/dist/gnome-icons.json');

    for (const iconName in iconNames) {
      const aliases = iconNames[iconName];
      this.icons.push([iconName, ...aliases]);
    }
  }

  /** Returns a human-readable name of the icon theme. */
  get name() {
    return 'GNOME Icons';
  }

  /**
   * Returns a list of icons that match the given search term. The search uses the aliases
   * of the icons.
   *
   * @param searchTerm The search term to filter the icons.
   * @returns An array of icons that match the search term.
   */
  public async listIcons(searchTerm: string) {
    return matchSorter(this.icons, searchTerm, {
      threshold: matchSorter.rankings.CONTAINS,
    }).map(([icon]) => icon);
  }

  /**
   * Creates a div element that contains the icon with the given name.
   *
   * @param icon One of the icons returned by `listIcons`.
   * @returns A div element that contains the icon.
   */
  createDiv(icon: string) {
    const containerDiv = document.createElement('div');
    containerDiv.classList.add('icon-container');

    // const iconDiv = document.createElement('img');
    // containerDiv.appendChild(iconDiv);

    // iconDiv.style.width = '80%';
    // iconDiv.style.height = '80%';
    // iconDiv.src = `assets/gnome/icons/${icon}.svg`;

    const iconDiv = document.createElement('div');
    containerDiv.appendChild(iconDiv);

    iconDiv.style.width = '80%';
    iconDiv.style.height = '80%';
    iconDiv.style.backgroundColor = 'white';
    iconDiv.style.maskSize = 'cover';
    iconDiv.style.maskImage = `url('assets/gnome/icons/${icon}.svg')`;

    return containerDiv;
  }
}
