module SiteHelpers

  class MetaString
    attr_accessor :string, :max_length

    def initialize(string, max_length)
      @string = string
      @max_length = max_length
    end

    def subtitle
      "Josh W Lewis"
    end

    def extension_keywords
      ["Ruby Developer", "JavaScript Engineer", "Consultant", "Entrepreneur", "Husband", "Dad", "Memphian", "Disc Golfer"]
    end

    def extensions
      extension_keywords.each_with_index.map do |e,i|
        extension_keywords[0..i].to_sentence
      end.reverse
    end

    def base
      string ? string : subtitle
    end

    def subtitled
      subtitled = base + " | " + subtitle
      if base == subtitle || subtitled.length > max_length
        base
      else
        subtitled
      end
    end

    def extension
      extensions.find{|e| e.length <= max_length - "#{subtitled}: ".length}
    end

    def extended
      extension ? "#{subtitled}: #{extension}" : subtitled
    end

    def to_s
      extended
    end

  end

  def page_title
    MetaString.new(current_page.data.title, 70)
  end

  def page_description
    MetaString.new(current_page.data.description, 155)
  end

  def article_tag_count
    [blog.tags.count, blog.articles.count].min
  end

  def long_date(date)
    date.to_date.strftime "%B %-d, %Y"
  end

  def slash_tag_list(article)
    content_tag(:div, class: :tags) do
      article.tags.map do |t|
        link_to t, "/essays/categories/#{t}"
      end.join(content_tag :span, '/')
    end
  end

  def sentence_tag_list(article)
    if tags = article.tags
      "This article was filed under " +
      content_tag(:div, class: :tags) do
        article.tags.map{|t| link_to t, "/essays/categories/#{t}"}.to_sentence
      end
    else
      nil
    end
  end

  def step(id, opts={}, &block)
    content_tag :div, id: id, class: :step, data: opts do
      capture(&block) if block_given?
    end
  end

  def slide_decks
    sitemap.resources.select{|r| r.data.published }
  end
end