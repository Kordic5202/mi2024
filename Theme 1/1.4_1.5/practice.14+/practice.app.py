from flask import Flask, request, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Дозволяє CORS для запитів з фронтенду

# Налаштування бази даних
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://book_admin:password@localhost/books_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Модель книги
class Book(db.Model):
    book_id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    author = db.Column(db.String(255), nullable=False)

# Створення таблиці (виконати один раз)
with app.app_context():
    db.create_all()

# Отримати всі книги
@app.route('/api/books', methods=['GET'])
def get_books():
    books = Book.query.all()
    return jsonify([{"book_id": book.book_id, "title": book.title, "author": book.author} for book in books])

# Додати нову книгу
@app.route('/api/books', methods=['POST'])
def add_book():
    data = request.json
    new_book = Book(title=data['title'], author=data['author'])
    db.session.add(new_book)
    db.session.commit()
    return jsonify({"message": "Книгу додано!", "book_id": new_book.book_id}), 201

# Видалити книгу
@app.route('/api/books/<int:book_id>', methods=['DELETE'])
def delete_book(book_id):
    book = Book.query.get(book_id)
    if not book:
        return jsonify({"error": "Книгу не знайдено"}), 404
    db.session.delete(book)
    db.session.commit()
    return jsonify({"message": "Книгу видалено"}), 200

if __name__ == '__main__':
    app.run(debug=True)
