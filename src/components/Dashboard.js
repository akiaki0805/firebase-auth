import React, { useState } from 'react'
import { Card, Button,Alert } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'

export default function Dashboard() {

  const [error, setError] = useState("")
  const {currentUser,logout} = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    setError('')

    try{
      await logout()
      navigate()

    }catch{
      setError('ログアウトに失敗しました')
    }
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className='text-center mb-4'>あなたのプロフィール</h2>
          {error && <Alert variant="danger">{error}</Alert>}

          <strong>メールアドレス: </strong>{currentUser.email}<br/>
          <strong>ユーザーネーム: </strong>

          <Link to = "/update-profile" className='btn btn-primary w-100 mt-3'>プロフィールを更新する</Link>
        </Card.Body>
      </Card>

      <div className='w-100 text-center mt-2'>
        <Button variant="link" onClick={handleLogout}>ログアウトする</Button>
      </div>
    </>
  )
}
