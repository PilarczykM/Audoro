'use client'

import { cn, configureAssistant, getSubjectColor } from '@/lib/utils'
import { vapi } from '@/lib/vapi.sdk'
import Lottie, { LottieRefCurrentProps } from 'lottie-react'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import soundwaves from '@/constants/soundwaves.json'

enum CallStatus {
  INACTIVE,
  CONNECTING,
  ACTIVE,
  FINISHED,
}

const CompanionComponent = ({
  subject,
  topic,
  name,
  userName,
  userImage,
  style,
  voice,
}: CompanionComponentProps) => {
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const lottieRef = useRef<LottieRefCurrentProps>(null)
  const [isMicMuted, setIsMicMuted] = useState(false)
  const [messages, setMessages] = useState<SavedMessage[]>([])

  const toggleMicrophone = () => {
    const isMuted = vapi.isMuted()
    vapi.setMuted(!isMuted)
    setIsMicMuted(!isMuted)
  }

  const handleCall = async () => {
    setCallStatus(CallStatus.CONNECTING)

    const assistantOverrides = {
      variableValues: { subject, topic, style },
      clientMessages: ['transcript'],
      serverMessages: [],
    }

    // @ts-expect-error Error comes from sdk
    vapi.start(configureAssistant(voice, style), assistantOverrides)
  }

  const handleDisconnect = () => {
    setCallStatus(CallStatus.FINISHED)
    vapi.stop()
  }

  useEffect(() => {
    if (lottieRef) {
      if (isSpeaking) {
        lottieRef.current?.play()
      } else {
        lottieRef.current?.stop()
      }
    }
  }, [isSpeaking, lottieRef])

  useEffect(() => {
    const onCallStart = () => {
      setMessages([])
      setCallStatus(CallStatus.ACTIVE)
    }
    const onCallEnd = () => setCallStatus(CallStatus.FINISHED)
    const onMessage = (message: Message) => {
      if (message.type === 'transcript' && message.transcriptType === 'final') {
        const newMessage = { role: message.role, content: message.transcript }
        setMessages((prev) => [newMessage, ...prev])
      }
    }
    const onError = (error: Error) => console.log('Error', error)
    const onSpeechStart = () => setIsSpeaking(true)
    const onSpeechEnd = () => setIsSpeaking(false)

    vapi.on('call-start', onCallStart)
    vapi.on('call-end', onCallEnd)

    vapi.on('message', onMessage)

    vapi.on('error', onError)

    vapi.on('speech-start', onSpeechStart)
    vapi.on('speech-end', onSpeechEnd)

    return () => {
      vapi.on('call-start', onCallStart)
      vapi.off('call-end', onCallEnd)

      vapi.off('message', onMessage)

      vapi.off('error', onError)

      vapi.off('speech-start', onSpeechStart)
      vapi.off('speech-end', onSpeechEnd)
    }
  }, [])

  return (
    <section className="flex flex-col h-[70vh]">
      <section className="flex gap-8 max-sm:flex-col">
        <div className="companion-section">
          <div
            className="companion-avatar"
            style={{ backgroundColor: getSubjectColor(subject) }}
          >
            <div
              className={cn(
                'absolute transition-opacity duration-100',
                callStatus === CallStatus.FINISHED ||
                  callStatus === CallStatus.INACTIVE
                  ? 'opacity-100'
                  : 'opacity-0',
                callStatus === CallStatus.CONNECTING &&
                  'opacity-100 animate-pulse'
              )}
            >
              <Image
                src={`/icons/${subject}.svg`}
                alt="icon"
                width={150}
                height={150}
                className="max-sm:w-fit"
              />
            </div>
            <div
              className={cn(
                'absolute transition-opacity duration-1000',
                callStatus === CallStatus.ACTIVE ? 'opacity-100' : 'opacity-0'
              )}
            >
              <Lottie
                lottieRef={lottieRef}
                animationData={soundwaves}
                autoplay={false}
                className="companion-lottie"
              />
            </div>
          </div>
          <p className="font-bold text-2xl">{name}</p>
        </div>
        <div className="user-section">
          <div className="user-avatar">
            <Image
              src={userImage}
              alt={userImage}
              width={130}
              height={130}
              className="rounded-lg"
            />
            <p className="font-bold text-2xl">{userName}</p>
          </div>
          <button
            className="btn-mic"
            onClick={toggleMicrophone}
            disabled={callStatus !== CallStatus.ACTIVE}
          >
            <Image
              src={isMicMuted ? '/icons/mic-off.svg' : '/icons/mic-on.svg'}
              alt="Microphone icon"
              width={36}
              height={36}
            />
            <p className="max-sm:hidden">
              {isMicMuted ? 'Turn on Microphone' : 'Turn off Microphone'}
            </p>
          </button>

          <button
            className={cn(
              'rounded-lg py-2 cursor-pointer transition-colors w-full text-white',
              callStatus === CallStatus.ACTIVE ? 'bg-red-700' : 'bg-primary',
              callStatus === CallStatus.CONNECTING && 'animate-pulse'
            )}
            onClick={
              callStatus === CallStatus.ACTIVE ? handleDisconnect : handleCall
            }
          >
            {callStatus === CallStatus.ACTIVE
              ? 'End Session'
              : callStatus === CallStatus.CONNECTING
              ? 'Connecting'
              : 'Start Session'}
          </button>
        </div>
      </section>
      <section className="mt-5 relative flex flex-col gap-4 w-full items-center pt-10 flex-grow overflow-hidden">
        <h2 className="text-3xl self-start">Transcript</h2>
        <div className="overflow-y-auto border border-accent-foreground w-full flex flex-col gap-4 max-sm:gap-2 pr-2 h-full text-2xl no-scrollbar">
          {messages.map((message, index) => {
            if (message.role === 'assistant') {
              return (
                <p key={index} className="max-sm:text-sm mb-1 text-left">
                  <span className="font-semibold">
                    {name.split(' ')[0].replace('/[.,]/g, ', '')}:
                  </span>{' '}
                  {message.content}
                </p>
              )
            } else {
              return (
                <p
                  key={index}
                  className="text-primary text-right mb-1 max-sm:text-sm"
                >
                  <span className="font-semibold">{userName}:</span>{' '}
                  {message.content}
                </p>
              )
            }
          })}
        </div>
        {/* <div className="transcript-fade" /> */}
      </section>
    </section>
  )
}

export default CompanionComponent
