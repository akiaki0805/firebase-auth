import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
// 資料ではuseHistoryだがバージョンが変わりNavigateに置き換わりました
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function ForgotPassword() {

  const emailRef = useRef()
  const { resetPassword } = useAuth()
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault()


    try {
      setMessage('')
      setError('')
      setLoading(true)
      await resetPassword(emailRef.current.value)
      setMessage('詳細な手順については、受信トレイを確認してください')
    } catch {
      setError('パスワードのリセットに失敗しました')
    }
    setLoading(false)

  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className='text-center mb-4'>パスワードをリセット</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <Form onSubmit={handleSubmit}>
            {/* EmailSpace */}
            <Form.Group id="email" >
              <Form.Label>メールアドレス</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>



            {/* SignUpButtonSpace */}
            <br />
            <Button disabled={loading} className="w-100" type="submit" > パスワードをリセット </Button>
          </Form>
          {/*  */}
          <div className='w-100 text-center mt-3'>
            <Link to="/login">ログイン</Link>
          </div>
        </Card.Body>
      </Card>
      {/* textSpace */}
      <div className='w-100 text-center mt-2'>
        アカウントを作りますか？ <Link to="/signup">アカウントを登録する</Link>
      </div>
    </>
  )
}
