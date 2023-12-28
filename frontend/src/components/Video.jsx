'use client';

import { Button, Modal } from 'flowbite-react';
import { useState } from 'react';
export default function DefaultModal() {
  const [openModal, setOpenModal] = useState();
  const props = { openModal, setOpenModal };

  return (
    <div className='flex justify-center items-center mt-7'>
      <Button onClick={() => props.setOpenModal('default')}>OverView</Button>
      <Modal show={props.openModal === 'default'} onClose={() => props.setOpenModal(undefined)}>
        <Modal.Header>DNA : OverView</Modal.Header>
        <Modal.Body>
        <video className="w-full" autoplay controls>
        <source src="/video.mp4" type="video/mp4" />
        </video>

        </Modal.Body>
        {/* <Modal.Footer>
          <Button onClick={() => props.setOpenModal(undefined)}>I accept</Button>
          <Button color="gray" onClick={() => props.setOpenModal(undefined)}>
            Decline
          </Button>
        </Modal.Footer> */}
      </Modal>
    </div>
  )
}


