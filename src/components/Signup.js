import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
// 資料ではuseHistoryだがバージョンが変わりNavigateに置き換わりました
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'


// アカウント作成ページ
export default function Signup() {

    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { signup } = useAuth()
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();


    async function handleSubmit(e) {
        e.preventDefault()

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Passwords do not match')
        }

        try {
            setError('')
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
            navigate("/");
        } catch {
            setError('アカウントの作成に失敗しました、すでに登録済みの場合はログインにお進みください')
        }
        setLoading(false)

    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className='text-center mb-4'>新規登録</h2>
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

                        {/* PassworlconfirmationSpace */}
                        <Form.Group id="password-confirm" >
                            <Form.Label>パスワードの確認</Form.Label>
                            <Form.Control type="password" ref={passwordConfirmRef} required />
                        </Form.Group>

                        {/* SignUpButtonSpace */}
                        <br />
                        <Button disabled={loading} className="w-100" type="submit" > アカウントを登録 </Button>
                    </Form>
                </Card.Body>
            </Card>
            {/* textSpace */}
            <div className='w-100 text-center mt-2'>
                すでにアカウントを持っている方は <Link to="/Login">ログイン</Link>
            </div>
        </>
    )
}
