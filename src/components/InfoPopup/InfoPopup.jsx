import React from 'react'
import './InfoPopup.scss'
import { ReactComponent as IconFail } from '../../images/icon-fail.svg'
import { ReactComponent as Success } from '../../images/icon-success.svg'
function InfoPopup({ isError, message, isOpenPopup }) {
  return (
    <div
      className={`info-popup ${isOpenPopup ? 'info-popup_opened' : ''} ${
        isError ? 'info-popup_type_error' : 'info-popup_type_success'
      }`}
    >
      {isError ? (
        <IconFail className="info-popup__icon" />
      ) : (
        <Success className="info-popup__icon" />
      )}

      <span className="info-popup__text">{message}</span>
    </div>
  )
}

export default InfoPopup
