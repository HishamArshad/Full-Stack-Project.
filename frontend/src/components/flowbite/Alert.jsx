'use client';

import { Alert } from 'flowbite-react';
import { HiInformationCircle } from 'react-icons/hi';

export default function AlertWithIcon({status}) {
  return (
    <Alert
      color="failure"
      icon={HiInformationCircle}
    >
      <span>
        <p>
          <span className="font-medium">
            Error!__
          </span>
          {status}
        </p>
      </span>
    </Alert>
  )
}


