import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
// 資料ではuseHistoryだがバージョンが変わりNavigateに置き換わりました
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Login() {

    const emailRef = useRef()
    const passwordRef = useRef()
    const { login } = useAuth()
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault()


        try {
            setError('')
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            navigate("/");
        } catch {
            setError('ログインに失敗しました。')
        }
        setLoading(false)

    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className='text-center mb-4'>ログイン</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        {/* EmailSpace */}
                        <Form.Group id="email" >
                            <Form.Label>メールアドレス</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>

                        {/* PasswordSpace */}
                        <Form.Group id="password" >
                            <Form.Label>パスワード</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required />
                        </Form.Group>

                        {/* SignUpButtonSpace */}
                        <br />
                        <Button disabled={loading} className="w-100" type="submit" > ログイン </Button>
                    </Form>
                    {/*  */}
                    <div className='w-100 text-center mt-3'>
                        <Link to ="/forgot-password">パスワードをお忘れですか？</Link>
                    </div>
                </Card.Body>
            </Card>
            {/* textSpace */}
            <div className='w-100 text-center mt-2'>
                アカウントを作りますか？ <Link to="/signup">新規登録</Link>
            </div>
        </>
    )
}
