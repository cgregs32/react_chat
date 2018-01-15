class CreateChatMessages < ActiveRecord::Migration[5.1]
  def change
    create_table :chat_messages do |t|
      t.belongs_to :user, foreign_key: true
      t.text :body, null: false

      t.timestamps
    end
  end
end
