module SiteHelpers

  def page_title
    title = "Josh W Lewis: Rubyist"
    if data.page.title
      title << " | " + data.page.title
    end
    title
  end

  def page_description
    if data.page.description
      description = data.page.description
    else
      description = "Josh W Lewis: Rubyist, Web Developer, Husband, Dad"
    end
    description
  end

end