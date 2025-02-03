import React, { useState, useMemo } from 'react';
import { useProjects } from '@/contexts/ProjectContext';
import { Trash2, RefreshCw, Pin, PinOff, Mail, MailOpen, ChevronDown } from 'lucide-react';

const MESSAGES_PER_PAGE = 3;

interface Message {
  id: string;
  sujet: string;
  email: string;
  message: string;
  date: string;
  isRead: boolean;
  isPinned: boolean;
  isDeleted: boolean;
}

interface MessageManagerProps {
  onDeleteClick: (id: string) => void;
  onEmptyTrash: () => void;
  className?: string;
}

export default function MessageManager({ onDeleteClick, onEmptyTrash, className }: MessageManagerProps) {
  const { messages, setMessages, updateMessage, restoreMessage } = useProjects();
  const [showTrash, setShowTrash] = useState(false);
  const [displayedMessages, setDisplayedMessages] = useState(MESSAGES_PER_PAGE);

  const activeMessages = useMemo(() => messages.filter(msg => !msg.isDeleted), [messages]);
  const deletedMessages = useMemo(() => messages.filter(msg => msg.isDeleted), [messages]);

  const currentMessages = showTrash ? deletedMessages : activeMessages;

  const handleToggleRead = (id: string) => {
    updateMessage(id, { isRead: !messages.find(msg => msg.id === id)?.isRead });
  };

  const handleTogglePin = (id: string) => {
    updateMessage(id, { isPinned: !messages.find(msg => msg.id === id)?.isPinned });
  };

  const handleRestore = (id: string) => {
    restoreMessage(id);
  };

  const handleDelete = (id: string) => {
    onDeleteClick(id);
  };

  const handleEmptyTrash = () => {
    onEmptyTrash();
  };

  const loadMoreMessages = () => {
    setDisplayedMessages(prev => prev + MESSAGES_PER_PAGE);
  };

  return (
    <div className={`mt-12 mb-8 bg-white dark:bg-gray-800 bg-opacity-50 dark:bg-opacity-50 backdrop-blur-md rounded-lg shadow-md p-6 ${className}`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          {showTrash ? 'Corbeille' : 'Messages reçus'}
        </h2>
        <div className="flex items-center">
          <button
            onClick={() => setShowTrash(!showTrash)}
            className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 mr-2 flex items-center justify-center"
            aria-label={showTrash ? "Voir les messages" : "Voir la corbeille"}
          >
            {showTrash ? <RefreshCw size={20} /> : <Trash2 size={20} />}
          </button>
          {showTrash && (
            <button
              onClick={handleEmptyTrash}
              className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 flex items-center justify-center"
              aria-label="Vider la corbeille"
            >
              <Trash2 size={20} />
            </button>
          )}
        </div>
      </div>
      {currentMessages.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">Aucun message {showTrash ? 'dans la corbeille' : 'reçu'} pour le moment.</p>
      ) : (
        <div className="space-y-4">
          {currentMessages.slice(0, displayedMessages).map((message) => (
            <div key={message.id} className={`bg-gray-100 dark:bg-gray-700 p-4 rounded-lg ${message.isPinned ? 'border-2 border-yellow-500' : ''}`}>
              <div className="flex flex-wrap justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-gray-200">{message.sujet}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{message.email}</p>
                </div>
                <div className="flex space-x-2 shrink-0">
                  {!showTrash && (
                    <>
                      <button onClick={() => handleToggleRead(message.id)} className="text-blue-500 hover:text-blue-600">
                        {message.isRead ? <MailOpen size={20} /> : <Mail size={20} />}
                      </button>
                      <button onClick={() => handleTogglePin(message.id)} className="text-yellow-500 hover:text-yellow-600">
                        {message.isPinned ? <PinOff size={20} /> : <Pin size={20} />}
                      </button>
                      <button onClick={() => handleDelete(message.id)} className="text-red-500 hover:text-red-600">
                        <Trash2 size={20} />
                      </button>
                    </>
                  )}
                  {showTrash && (
                    <>
                      <button onClick={() => handleRestore(message.id)} className="text-green-500 hover:text-green-600">
                        <RefreshCw size={20} />
                      </button>
                      <button onClick={() => handleDelete(message.id)} className="text-red-500 hover:text-red-600">
                        <Trash2 size={20} />
                      </button>
                    </>
                  )}
                </div>
              </div>
              <p className="mt-2 text-gray-700 dark:text-gray-300">{message.message}</p>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-500">{new Date(message.date).toLocaleString()}</p>
            </div>
          ))}
          {currentMessages.length > displayedMessages && (
            <div className="flex justify-center mt-4">
              <button
                onClick={loadMoreMessages}
                className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
              >
                Voir plus de messages
                <ChevronDown className="ml-2" size={20} />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

