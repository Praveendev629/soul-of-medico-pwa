import { FiExternalLink } from 'react-icons/fi'

interface SupportChannel {
  name: string
  icon: string
  description: string
  link: string
  color: string
}

export default function SupportPage() {
  const channels: SupportChannel[] = [
    {
      name: 'Telegram',
      icon: '✉️',
      description: 'Join our community group',
      link: 'https://t.me/soulofmedico',
      color: 'bg-blue-50 border-blue-200',
    },
    {
      name: 'WhatsApp',
      icon: '💬',
      description: 'Quick support & updates',
      link: 'https://wa.me/919876543210',
      color: 'bg-green-50 border-green-200',
    },
    {
      name: 'Email',
      icon: '📧',
      description: 'Detailed queries & feedback',
      link: 'mailto:support@soulofmedico.com',
      color: 'bg-purple-50 border-purple-200',
    },
    {
      name: 'Website',
      icon: '🌐',
      description: 'Visit our website',
      link: 'https://soulofmedico.com',
      color: 'bg-orange-50 border-orange-200',
    },
    {
      name: 'Feedback Form',
      icon: '📋',
      description: 'Share your feedback',
      link: 'https://forms.gle/soulofmedico',
      color: 'bg-red-50 border-red-200',
    },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Support & Connect</h1>

      <div className="bg-blue-50 border border-primary rounded-lg p-4">
        <p className="text-sm text-gray-700">
          Have questions or need help? Reach out through any channel below. We're here to help!
        </p>
      </div>

      <div className="space-y-3">
        {channels.map((channel, index) => (
          <a
            key={index}
            href={channel.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`block p-4 rounded-lg border ${channel.color} hover:shadow-lg transition transform hover:scale-105`}
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 text-2xl">
                {channel.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg">{channel.name}</h3>
                <p className="text-sm text-gray-600">{channel.description}</p>
              </div>
              <FiExternalLink className="w-5 h-5 text-gray-400 flex-shrink-0" />
            </div>
          </a>
        ))}
      </div>

      <div className="bg-gray-50 rounded-lg p-4 text-center">
        <p className="text-sm text-gray-600">
          Average response time: <span className="font-semibold">Less than 2 hours</span>
        </p>
      </div>
    </div>
  )
}
