'use client'
import React, { useState } from 'react'
import Modal from './Modal'
import useUploadModal from '@/providers/useUploadModal'
import { useForm,FieldValues,SubmitHandler } from 'react-hook-form'
import Input from './Input'
import Button from './Button'
import {toast} from 'react-hot-toast'
import { useUser } from '@/hooks/useUser'
import uniqid from 'uniqid'
const UploadModal = () => {
    const uploadModal = useUploadModal();
    const [isLoading , setIsLoading] = useState(false)
    const {user} = useUser()
    const {
        register,handleSubmit,reset
    } = useForm<FieldValues>({
        defaultValues : {
            author : '',
            title : '',
            song : null,
            image : null
        }
    })
    const onChange = (open : boolean) => {
        if(!open){
           reset()
           uploadModal.onClose()
        }
    }

    const onSubmit : SubmitHandler<FieldValues> = async(values) => {
        try {
            setIsLoading(true)

            const imagefile = values.image?.[0]
            const songfile = values.song?.[0]

            if(!imagefile || !songfile || !user){
                toast.error('Missing Fields')
                return
            }

            const UniqId = uniqid()
        } catch (error) {
            toast.error("Something went wrong")
        } finally{
            setIsLoading(false)
        }
    }
    return (
    <div>
      <Modal
      title = "Add a song"
      description = "Upload an mp3 file"
      isOpen = {uploadModal.isOpen}
      
      onChange = {onChange}
      >
        <form 
        className = 'flex flex-col gap-y-4'
        onSubmit={(handleSubmit(onSubmit))}>
            <Input id = 'title' 
            disabled = {isLoading}
            {...register('title', {required : true})}
            placeholder='Song title'
           />
            <Input id = 'author' 
            disabled = {isLoading}
            {...register('author', {required : true})}
            placeholder='Song author'
           />
           <div>
            <div className = 'pb-1'> Select a song file</div>
           </div>
           <Input id = 'song' 
           type = 'file'
            disabled = {isLoading}
            accept = '.mp3'
            {...register('song', {required : true})}
           />
            <div>
            <div className = 'pb-1'> Select an image</div>
           </div>
           <Input id = 'image' 
           type = 'file'
            disabled = {isLoading}
            accept = 'image/*'
            {...register('image', {required : true})}
           />
           <Button type = 'submit' disabled = {isLoading}>Create</Button>
        </form>
      </Modal>
    </div>
  )
}

export default UploadModal
