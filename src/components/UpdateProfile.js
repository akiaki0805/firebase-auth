import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
// 資料ではuseHistoryだがバージョンが変わりNavigateに置き換わりました
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'


// アカウント作成ページ
export default function UpdateProfile() {

    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { currentUser, updateEmail, updatePassword } = useAuth()
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();


    function handleSubmit(e) {
        e.preventDefault()

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('パスワードが一致しません')
        }


        const promises = []
        if (emailRef.current.value !== currentUser.email) {
            promises.push(updateEmail(emailRef.current.value))
        }
        if (passwordRef.current.value) {
            promises.push(updatePassword(passwordRef.current.value))
        }

        Promise.all(promises).then(() => {
            navigate('/')
        }).catch(() => {
            setError('アカウントの更新に失敗しました')
        }).finally(() => {
            setLoading(false)
        })



    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className='text-center mb-4'>プロフィールの更新</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        {/* EmailSpace */}
                        <Form.Group id="email" >
                            <Form.Label>メールアドレス</Form.Label>
                            <Form.Control type="email" ref={emailRef} required
                                defaultValue={currentUser.email} />
                        </Form.Group>

                        {/* PasswordSpace */}
                        <Form.Group id="password" >
                            <Form.Label>パスワード</Form.Label>
                            <Form.Control type="password" ref={passwordRef}
                                placeholder='何も入力しないで現在の状態を維持する' />
                        </Form.Group>

                        {/* PassworlconfirmationSpace */}
                        <Form.Group id="password-confirm" >
                            <Form.Label>パスワードの確認</Form.Label>
                            <Form.Control type="password" ref={passwordConfirmRef}
                                placeholder='何も入力しないで現在の状態を維持する' />
                        </Form.Group>

                        {/* SignUpButtonSpace */}
                        <br />
                        <Button disabled={loading} className="w-100" type="submit" > 更新 </Button>
                    </Form>
                </Card.Body>
            </Card>
            {/* textSpace */}
            <div className='w-100 text-center mt-2'>
                <Link to="/">もどる</Link>
            </div>
        </>
    )
}
