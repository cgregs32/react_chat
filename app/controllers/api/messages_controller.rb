class Api::MessagesController < ApplicationController
  def create
    MessageBus.publish "/chat_channel", message_params.to_json
  end

  private
    def message_params
      params.require(:message).permit(:email, :body)
    end
end
