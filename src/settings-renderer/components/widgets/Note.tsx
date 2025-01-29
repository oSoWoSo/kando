//////////////////////////////////////////////////////////////////////////////////////////
//   _  _ ____ _  _ ___  ____                                                           //
//   |_/  |__| |\ | |  \ |  |    This file belongs to Kando, the cross-platform         //
//   | \_ |  | | \| |__/ |__|    pie menu. Read more on github.com/kando-menu/kando     //
//                                                                                      //
//////////////////////////////////////////////////////////////////////////////////////////

// SPDX-FileCopyrightText: Simon Schneegans <code@simonschneegans.de>
// SPDX-License-Identifier: MIT

import React from 'react';

import * as classes from './Note.module.scss';

interface IProps {
  /** Content to display inside the note. */
  children: React.ReactNode;

  /** Whether the text should be centered. Defaults to false. */
  center?: boolean;

  /** Margin to apply to the top of the note. Defaults to 0. */
  marginTop?: number;

  /** Margin to apply to the bottom of the note. Defaults to 0. */
  marginBottom?: number;
}

/**
 * Shows some text in a smaller font size and with a muted color.
 *
 * @param props - The properties for the note component.
 * @returns A note element.
 */
export default (props: IProps) => {
  const className = classes.note + ' ' + (props.center ? classes.center : '');
  return (
    <div
      className={className}
      style={{ marginTop: props.marginTop || 0, marginBottom: props.marginBottom || 0 }}>
      {props.children}
    </div>
  );
};
