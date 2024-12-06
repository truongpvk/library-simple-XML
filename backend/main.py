from flask import Flask, request, jsonify
from lxml import etree
from flask_cors import CORS
from datetime import datetime
import uuid

app = Flask(__name__)
CORS(app=app)
path = 'D:\\Codespace-Learning\\Learning_School\\HePhanTan\\XML\\data\\books.xml'
ns = {'ns': 'http://www.w3schools.com'}

@app.route('/delete', methods=['POST'])
def delete_element():
  data = request.json
  id = data.get('bookId')
  print(id)
  if not id:
    return jsonify({'err': 'ID is required'})

  try:
    tree = etree.parse(path)
    root = tree.getroot()
    print(root)
    element_to_remove = root.xpath(f"//ns:book[@bookId='{id}']", namespaces=ns)
    print(element_to_remove)
    if not element_to_remove:
      return jsonify({'error': 'Element not found'})
        
    for elem in element_to_remove:
        root.remove(elem)
    
    # Lưu lại file XML
    tree.write(path, pretty_print=True, xml_declaration=True, encoding='UTF-8')

    return jsonify({'message': f'Element with id={id} deleted successfully'})
  except Exception as e:
    return jsonify({'err': str(e)})

@app.route('/addBook', methods=['POST'])
def addNewBook():
    book = request.json
    id = str(uuid.uuid4())
    title = book.get('title').strip()
    other_title = book.get('other_title').strip()
    authors = book.get('authors')
    description = book.get('description').strip()
    datepublic = datetime.now().strftime("%m-%d-%Y")
    chapters = []

    try:
      tree = etree.parse(path)
      root = tree.getroot()

      # Tạo tag book
      book_tag = etree.Element("book", attrib={"bookId": id, "datepublic": datepublic})
      # Thông tin cơ bản
      title_tag = etree.Element("title")
      title_tag.text = title
      book_tag.append(title_tag)
      other_title_tag = etree.Element("other-title")
      other_title_tag.text = other_title
      book_tag.append(other_title_tag)

      authors_tag = etree.Element("authors")
      # Danh sach tac gia
      for author in authors:
        author_tag = etree.Element("author")
        author_tag.text = author.strip()
        authors_tag.append(author_tag)
      book_tag.append(authors_tag)
      
      description_tag = etree.Element('description')
      description_tag.text = description
      book_tag.append(description_tag)

      # Chương
      chapters_tag = etree.Element("chapters")
      book_tag.append(chapters_tag)

      root.append(book_tag)

      # Ghi lại file XML
      with open(path, 'wb') as file:
        file.write(etree.tostring(tree, pretty_print=True, encoding='utf-8', xml_declaration=True))
      
      return jsonify({'Status': 'Data was updated!'})
    except Exception as e:
      return jsonify({'Error': e})

if __name__ == '__main__':
    app.run(debug=True)