class TestExportsController < ApplicationController
  def index
    respond_to do |format|
      format.html
      format.pdf do
        render pdf: "Test",
              layout: "pdf.html",
              show_as_html: params.key?("debug")
      end
    end
  end
end
