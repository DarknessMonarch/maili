<script setup>
import { ref } from 'vue'
import axios from 'axios'
import AddIcon from '@/icons/AddIcon.vue'
import ExitIcon from '@/icons/ExitIcon.vue'
import BoldIcon from '@/icons/BoldIcon.vue'
import FileIcon from '@/icons/FileIcon.vue'
import EmailIcon from '@/icons/EmailIcon.vue'
import ImageIcon from '@/icons/ImageIcon.vue'
import { useToast } from 'vue-toastification'
import ItalicIcon from '@/icons/ItalicIcon.vue'
import UnderlineIcon from '@/icons/UnderlineIcon.vue'
import Footer from '@/components/footerComponent.vue'

const style = ref('')
const email = ref('')
const emails = ref([])
const subject = ref('')
const message = ref('')
const toast = useToast()
const SERVER_HOST = import.meta.env.VITE_SERVER_HOST

const postEmail = async () => {
  if (!emails.value.length || !subject.value || !message.value) {
    toast.error('Please enter all required fields')
    console.log(emails.value, subject.value, message.value)

    return
  }

  try {
    const response = await axios.post(
      `${SERVER_HOST}/send-email/`,
      {
        email: emails.value,
        subject: subject.value,
        text: message.value
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )

    toast.success(response.data.message)
    message.value = ''
    subject.value = ''
  } catch (err) {
    toast.error(err.response?.data?.message || 'An error occurred')
  }
}

const removeEmail = (emailToRemove) => {
  const indexToRemove = emails.value.indexOf(emailToRemove)
  if (indexToRemove !== -1) {
    emails.value.splice(indexToRemove, 1)
  }
}
const addEmail = () => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  if (email.value) {
    const newEmails = email.value.split(',').map((e) => e.trim())

    const isValid = newEmails.every((e) => re.test(e))

    if (isValid) {
      emails.value = [...emails.value, ...newEmails]
      email.value = ''
    } else {
      toast.error('Please enter valid email addresses')
    }
  } else {
    toast.error('Please enter an email address')
  }
}

const textBold = () => {
  style.value = 'bold'
}
const textItalic = () => {
  style.value = 'italic'
}
const textUnderline = () => {
  style.value = 'underline'
}

const attachImage = () => {
  const textarea = document.querySelector('.home-bottom-textarea')
  const fileInput = document.createElement('input')
  fileInput.type = 'file'

  fileInput.click()

  fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0]

    if (file) {
      const imageURL = URL.createObjectURL(file)

      const imageMarkdown = `![Alt text](${imageURL})`

      const selectionStart = textarea.selectionStart
      const selectionEnd = textarea.selectionEnd

      const newText =
        textarea.value.slice(0, selectionStart) + imageMarkdown + textarea.value.slice(selectionEnd)

      textarea.value = newText
      textarea.focus()
    }
  })
}

const attachFile = () => {
  const textarea = document.querySelector('.home-bottom-textarea')
  const fileInput = document.createElement('input')
  fileInput.type = 'file'

  fileInput.click()

  fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0]

    if (file) {
      const fileURL = URL.createObjectURL(file)

      const fileMarkdown = `[Attachment](${fileURL})`

      const selectionStart = textarea.selectionStart
      const selectionEnd = textarea.selectionEnd

      const newText =
        textarea.value.slice(0, selectionStart) + fileMarkdown + textarea.value.slice(selectionEnd)

      textarea.value = newText
      textarea.focus()
    }
  })
}
</script>

<template>
  <div class="home-wrapper">
    <div class="home-inner-wrapper">
      <div class="home-top">
        <div class="home-top-header">
          <img src="@/assets/logo.png" alt="logo" class="home-top-logo" />
        </div>
        <div class="home-top-input-container">
          <input type="email" v-model="email" placeholder="Add email" class="home-top-input" />
          <button @click="addEmail" class="home-top-button" type="button">
            <AddIcon class="add-icon" />
          </button>
        </div>
      </div>
      <div class="home-bottom">
        <div class="home-bottom-content">
          <div class="home-bottom-area">
            <h1>From</h1>
            <div class="home-area-inner">
              <span>Contact@sportypredict.com</span>
              <span>Cc Bcc</span>
            </div>
          </div>
          <div class="home-bottom-area">
            <div class="bottom-area-header">
              <h1>To</h1>
              <h1>No of recipients {{ emails.length }}</h1>
            </div>
            <div class="home-area-inner-container" v-if="emails.length > 0">
              <div v-for="email in emails" :key="email" class="home-area-inner">
                <div class="email-container">
                  <span>{{ email }}</span>
                  <ExitIcon class="email-remove-icon" @click="removeEmail(email)" />
                </div>
              </div>
            </div>
            <div class="home-area-inner-nothing" v-else>
              <span>No recipients</span>
            </div>
            <input type="text" v-model="subject" placeholder="Subject" class="home-top-input" />
            <div class="home-bottom-info">
              <textarea
                :class="{
                  'home-bottom-textarea--bold': style === 'bold',
                  'home-bottom-textarea--italic': style === 'italic',
                  'home-bottom-textarea--underline': style === 'underline'
                }"
                v-model="message"
                placeholder="Your email"
                class="home-bottom-textarea"
              ></textarea>
            </div>
          </div>
        </div>
        <div class="home-submit">
          <div class="home-extra">
            <button class="home-extra-button" @click="textBold">
              <BoldIcon class="home-extra-button-icon" />
            </button>
            <button class="home-extra-button" @click="textUnderline">
              <UnderlineIcon class="home-extra-button-icon" />
            </button>
            <button class="home-extra-button" @click="textItalic">
              <ItalicIcon class="home-extra-button-icon" />
            </button>
            <button class="home-extra-button" @click="attachImage">
              <ImageIcon class="home-extra-button-icon" />
            </button>
            <button class="home-extra-button" @click="attachFile">
              <FileIcon class="home-extra-button-icon" />
            </button>
          </div>
          <button class="home-submit-button" @click="postEmail">
            <span>Send Email</span>
            <EmailIcon class="home-submit-button-icon" />
          </button>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>
<style scoped>
@import '@/style/home.css';
</style>
