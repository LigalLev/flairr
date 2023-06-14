import React from 'react';

export function NotificationBubble(props) {
    const {text, onHide} = props
    return (
        <div
            className={'notification-bubble-container'}
            onClick={onHide}>
            <div className={'notification-bubble'}>
                {text}
                <div
                    className={'notification-bubble-dismiss-btn'}>
                    Close
                </div>
            </div>
        </div>
    );
}