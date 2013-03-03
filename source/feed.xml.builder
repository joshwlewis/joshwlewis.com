xml.instruct!
xml.feed "xmlns" => "http://www.w3.org/2005/Atom" do
  xml.title "Josh W Lewis"
  xml.subtitle "Personal site of Josh W Lewis: Software Engineer, Web Developer, Rubyist"
  xml.id "http://joshwlewis.com/"
  xml.link "href" => "http://joshwlewis.com/"
  xml.link "href" => "http://joshwlewis.com/feed.xml", "rel" => "self"
  xml.updated blog.articles.first.date.to_time.iso8601
  xml.author { xml.name "Josh W Lewis" }

  blog.articles[0..10].each do |article|
    xml.entry do
      xml.title article.title
      xml.link "rel" => "alternate", "href" => article.url
      xml.id article.url
      xml.published article.date.to_time.iso8601
      xml.updated article.date.to_time.iso8601
      xml.author { xml.name "Josh W Lewis" }
      xml.summary article.summary, "type" => "html"
      xml.content article.body, "type" => "html"
    end
  end
end