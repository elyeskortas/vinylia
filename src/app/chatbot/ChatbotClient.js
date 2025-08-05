"use client"

import { useChat } from "@ai-sdk/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function ChatbotClient() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat({
    api: "/api/chat",
  })

  return (
    <Card className="w-full max-w-2xl mx-auto h-[70vh] flex flex-col">
      <CardHeader className="border-b">
        <CardTitle className="text-center">Chatbot Vinylia</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden p-4">
        <ScrollArea className="h-full pr-4">
          {messages.length > 0 ? (
            messages.map((m) => (
              <div key={m.id} className={`mb-4 ${m.role === "user" ? "text-right" : "text-left"}`}>
                <div
                  className={`inline-block p-3 rounded-lg max-w-[80%] ${
                    m.role === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                  }`}
                >
                  <p className="font-semibold capitalize">{m.role === "user" ? "Vous" : "Vinylia Bot"}</p>
                  <p>{m.content}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              Dites bonjour à votre assistant Vinylia !
            </div>
          )}
          {isLoading && (
            <div className="text-center text-gray-500">
              <div className="spinner-border spinner-border-sm" role="status">
                <span className="visually-hidden">Chargement...</span>
              </div>{" "}
              Le bot réfléchit...
            </div>
          )}
          {error && (
            <div className="alert alert-danger mt-4" role="alert">
              <i className="bi bi-exclamation-triangle"></i> Erreur: {error.message}
            </div>
          )}
        </ScrollArea>
      </CardContent>
      <CardFooter className="border-t p-4">
        <form onSubmit={handleSubmit} className="flex w-full space-x-2">
          <Input
            className="flex-1"
            value={input}
            placeholder="Posez une question sur les vinyles..."
            onChange={handleInputChange}
            disabled={isLoading}
            id="chat-input" // L'attribut 'id' a été ajouté ici
          />
          <Button type="submit" disabled={isLoading}>
            Envoyer
          </Button>
        </form>
      </CardFooter>
    </Card>
  )
}
