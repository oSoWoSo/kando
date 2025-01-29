//////////////////////////////////////////////////////////////////////////////////////////
//   _  _ ____ _  _ ___  ____                                                           //
//   |_/  |__| |\ | |  \ |  |    This file belongs to Kando, the cross-platform         //
//   | \_ |  | | \| |__/ |__|    pie menu. Read more on github.com/kando-menu/kando     //
//                                                                                      //
//////////////////////////////////////////////////////////////////////////////////////////

// SPDX-FileCopyrightText: Simon Schneegans <code@simonschneegans.de>
// SPDX-License-Identifier: MIT

import React from 'react';
import { CSSTransition } from 'react-transition-group';
import { RiCloseLargeFill } from 'react-icons/ri';

import Headerbar from './Headerbar';
import Button from './Button';

import * as classes from './Modal.module.scss';

interface IProps {
  /** Whether the modal is visible. */
  visible: boolean;

  /** Function to call when the modal is requested to be closed. */
  onClose: () => void;

  /** Content to display inside the modal. */
  children: React.ReactNode;

  /**
   * Optional title to display in the header bar. The position of the title depends on the
   * platform:
   *
   * - On macOS, the title is displayed in the center of the header bar.
   * - On other platforms, the title is displayed on the left side of the header bar.
   */
  title?: string;

  /** Maximum width of the modal. */
  maxWidth?: number;

  /** Padding to apply to the top of the modal content. */
  paddingTop?: number;

  /** Padding to apply to the bottom of the modal content. */
  paddingBottom?: number;

  /** Padding to apply to the left side of the modal content. */
  paddingLeft?: number;

  /** Padding to apply to the right side of the modal content. */
  paddingRight?: number;
}

/**
 * A customizable modal component. When props.visible becomes true, the modal will be
 * faded in with a CSS transition. When it becomes false, the modal will be faded out and
 * its content will be unmounted.
 *
 * @param props - The properties for the modal component.
 * @returns A modal element.
 */
export default (props: IProps) => {
  const ref = React.useRef(null);

  // Define the close button with an icon. On macOS, the close button is displayed on the
  // left side of the header bar. On other platforms, it is displayed on the right side.
  const closeButton = (
    <Button icon={<RiCloseLargeFill />} onClick={props.onClose} variant="flat" />
  );

  return (
    <CSSTransition
      in={props.visible}
      nodeRef={ref}
      // The modal CSS class uses a 200ms transition when fading in and out, so we set the
      // timeout to 200ms to match this.
      timeout={200}
      classNames="modal"
      unmountOnExit>
      <div ref={ref} onClick={props.onClose} className={classes.modalBackground}>
        <div
          className={classes.modal}
          onClick={(e) => e.stopPropagation()}
          style={{ maxWidth: props.maxWidth }}>
          <Headerbar
            transparent
            left={cIsMac ? closeButton : props.title}
            center={cIsMac ? props.title : null}
            right={!cIsMac ? closeButton : null}
            // The macOS header bar has no padding on the left side as there is the close
            // button. On other platforms, there is some padding on the left side as there
            // is the title.
            paddingLeft={cIsMac ? 0 : 15}
          />
          <div
            className={classes.content}
            style={{
              paddingTop: props.paddingTop,
              paddingBottom: props.paddingBottom,
              paddingLeft: props.paddingLeft,
              paddingRight: props.paddingRight,
            }}>
            {props.children}
          </div>
        </div>
      </div>
    </CSSTransition>
  );
};
