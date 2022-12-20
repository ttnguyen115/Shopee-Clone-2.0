import React from 'react'
import { toast } from 'react-toastify'

import { MAX_SIZE_UPLOAD_AVATAR } from 'src/constants'

interface Props {
  onChange?: (file?: File) => void
}

export default function InputFile({ onChange }: Props) {
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileFromLocal = event.target.files?.[0]
    fileInputRef.current?.setAttribute('value', '')
    if (fileFromLocal && (fileFromLocal.size >= MAX_SIZE_UPLOAD_AVATAR || !fileFromLocal.type.includes('image'))) {
      toast.error('Dung lượng file tối đa 1 MB. Định dạng:.JPEG, .PNG')
    } else {
      onChange && onChange(fileFromLocal)
    }
  }

  const handleUpload = () => {
    fileInputRef.current?.click()
  }

  return (
    <React.Fragment>
      <input
        className='hidden'
        type='file'
        accept='.jpg,.jpeg,.png'
        ref={fileInputRef}
        onChange={onFileChange}
        onClick={(event) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ;(event.target as any).value = null
        }}
      />
      <button
        className='flex h-10 items-center justify-end rounded-sm border bg-white px-6 text-sm text-gray-600 shadow-sm'
        type='button'
        onClick={handleUpload}
      >
        Chọn ảnh
      </button>
    </React.Fragment>
  )
}
