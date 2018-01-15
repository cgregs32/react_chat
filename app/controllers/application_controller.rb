class ApplicationController < ActionController::API
  include DeviseTokenAuth::Concerns::SetUserByToken
  before_action :json_request_format

  private
    def json_request_format
      request.format = :json
    end
end
