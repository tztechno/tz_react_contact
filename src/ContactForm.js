import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';

const ContactForm = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        nameKana: '',
        gender: '',
        date: '',
        time: '',
        treatment: '',
        email: '',
        emailConfirm: '',
        phone: '',
        message: ''
    });
    const [errors, setErrors] = useState({});

    const timeOptions = [
        "10:00～11:00", "11:00～12:00", "13:00～14:00",
        "14:00～15:00", "15:00～16:00", "16:00～17:00"
    ];

    const validate = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = '必須項目です';
        if (!formData.nameKana) newErrors.nameKana = '必須項目です';
        if (!formData.email) newErrors.email = '必須項目です';
        if (!formData.emailConfirm) newErrors.emailConfirm = '必須項目です';
        if (formData.email !== formData.emailConfirm) {
            newErrors.emailConfirm = 'メールアドレスが一致しません';
        }
        if (!formData.message) newErrors.message = '必須項目です';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (step === 1 && validate()) {
            setStep(2);
        } else if (step === 2) {
            setStep(3);
        }
    };

    const handleBack = () => {
        setStep(1);
    };

    const StepIndicator = () => (
        <ul className="flex justify-center mb-8 text-sm">
            {[1, 2, 3].map((num) => (
                <li key={num} className={`relative flex-1 text-center ${step >= num ? 'text-blue-600' : 'text-gray-400'}`}>
                    <span className={`w-8 h-8 mx-auto mb-2 rounded-full flex items-center justify-center ${step >= num ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                        {num}
                    </span>
                    <span className="block">
                        {num === 1 ? 'ご入力' : num === 2 ? 'ご確認' : '送信完了'}
                    </span>
                </li>
            ))}
        </ul>
    );

    if (step === 3) {
        return (
            <div className="max-w-2xl mx-auto p-6">
                <StepIndicator />
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">送信完了</h2>
                    <p className="mb-6">お問い合わせいただきまして誠にありがとうございます。</p>
                    <button onClick={() => window.location.href = '/'}
                        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
                        ホームへ戻る
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto p-6">
            <StepIndicator />

            <div className="bg-gray-50 p-6 mb-8 rounded">
                <p className="text-sm leading-relaxed">
                    必要事項ご記入の上、送信してください。
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {step === 1 ? (
                    <>
                        <div className="space-y-4">
                            <div>
                                <label className="block mb-2">
                                    お名前
                                    <span className="ml-2 text-xs text-white bg-red-500 px-2 py-1 rounded">必須</span>
                                </label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="山田 太郎"
                                    className="w-full p-2 border rounded"
                                />
                                {errors.name && (
                                    <div className="text-red-500 flex items-center mt-1">
                                        <AlertCircle className="w-4 h-4 mr-1" />
                                        {errors.name}
                                    </div>
                                )}
                            </div>

                            <div>
                                <label className="block mb-2">
                                    ふりがな
                                    <span className="ml-2 text-xs text-white bg-red-500 px-2 py-1 rounded">必須</span>
                                </label>
                                <input
                                    type="text"
                                    value={formData.nameKana}
                                    onChange={(e) => setFormData({ ...formData, nameKana: e.target.value })}
                                    placeholder="やまだ たろう"
                                    className="w-full p-2 border rounded"
                                />
                                {errors.nameKana && (
                                    <div className="text-red-500 flex items-center mt-1">
                                        <AlertCircle className="w-4 h-4 mr-1" />
                                        {errors.nameKana}
                                    </div>
                                )}
                            </div>

                            <div>
                                <label className="block mb-2">
                                    性別
                                    <span className="ml-2 text-xs text-gray-500 px-2 py-1 rounded border">任意</span>
                                </label>
                                <div className="space-x-4">
                                    {['男', '女'].map((gender) => (
                                        <label key={gender} className="inline-flex items-center">
                                            <input
                                                type="radio"
                                                name="gender"
                                                value={gender}
                                                checked={formData.gender === gender}
                                                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                                                className="mr-2"
                                            />
                                            {gender}
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block mb-2">
                                        ご希望日
                                        <span className="ml-2 text-xs text-gray-500 px-2 py-1 rounded border">任意</span>
                                    </label>
                                    <input
                                        type="date"
                                        value={formData.date}
                                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                        className="w-full p-2 border rounded"
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2">
                                        時間帯
                                        <span className="ml-2 text-xs text-gray-500 px-2 py-1 rounded border">任意</span>
                                    </label>
                                    <select
                                        value={formData.time}
                                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                                        className="w-full p-2 border rounded"
                                    >
                                        <option value="">選択してください</option>
                                        {timeOptions.map((time) => (
                                            <option key={time} value={time}>{time}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block mb-2">
                                    メールアドレス
                                    <span className="ml-2 text-xs text-white bg-red-500 px-2 py-1 rounded">必須</span>
                                </label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    placeholder="example@mail.com"
                                    className="w-full p-2 border rounded mb-2"
                                />
                                <input
                                    type="email"
                                    value={formData.emailConfirm}
                                    onChange={(e) => setFormData({ ...formData, emailConfirm: e.target.value })}
                                    placeholder="確認用メールアドレス"
                                    className="w-full p-2 border rounded"
                                />
                                {errors.emailConfirm && (
                                    <div className="text-red-500 flex items-center mt-1">
                                        <AlertCircle className="w-4 h-4 mr-1" />
                                        {errors.emailConfirm}
                                    </div>
                                )}
                            </div>

                            <div>
                                <label className="block mb-2">
                                    電話番号
                                    <span className="ml-2 text-xs text-gray-500 px-2 py-1 rounded border">任意</span>
                                </label>
                                <input
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    placeholder="09012345678"
                                    className="w-full p-2 border rounded"
                                />
                            </div>

                            <div>
                                <label className="block mb-2">
                                    ご質問など
                                    <span className="ml-2 text-xs text-white bg-red-500 px-2 py-1 rounded">必須</span>
                                </label>
                                <textarea
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    rows={5}
                                    className="w-full p-2 border rounded"
                                />
                                {errors.message && (
                                    <div className="text-red-500 flex items-center mt-1">
                                        <AlertCircle className="w-4 h-4 mr-1" />
                                        {errors.message}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="text-center">
                            <button
                                type="submit"
                                className="bg-blue-600 text-white px-8 py-3 rounded hover:bg-blue-700"
                            >
                                確認画面へ
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="space-y-4">
                            <div className="border-b pb-4">
                                <div className="font-bold mb-1">お名前</div>
                                <div>{formData.name}</div>
                            </div>
                            <div className="border-b pb-4">
                                <div className="font-bold mb-1">ふりがな</div>
                                <div>{formData.nameKana}</div>
                            </div>
                            {formData.gender && (
                                <div className="border-b pb-4">
                                    <div className="font-bold mb-1">性別</div>
                                    <div>{formData.gender}</div>
                                </div>
                            )}
                            {formData.date && formData.time && (
                                <div className="border-b pb-4">
                                    <div className="font-bold mb-1">ご希望日時</div>
                                    <div>{formData.date} {formData.time}</div>
                                </div>
                            )}
                            <div className="border-b pb-4">
                                <div className="font-bold mb-1">メールアドレス</div>
                                <div>{formData.email}</div>
                            </div>
                            {formData.phone && (
                                <div className="border-b pb-4">
                                    <div className="font-bold mb-1">電話番号</div>
                                    <div>{formData.phone}</div>
                                </div>
                            )}
                            <div className="border-b pb-4">
                                <div className="font-bold mb-1">ご質問など</div>
                                <div className="whitespace-pre-wrap">{formData.message}</div>
                            </div>
                        </div>

                        <div className="flex justify-center space-x-4">
                            <button
                                type="button"
                                onClick={handleBack}
                                className="bg-gray-500 text-white px-8 py-3 rounded hover:bg-gray-600"
                            >
                                修正する
                            </button>
                            <button
                                type="submit"
                                className="bg-blue-600 text-white px-8 py-3 rounded hover:bg-blue-700"
                            >
                                送信する
                            </button>
                        </div>
                    </>
                )}
            </form>
        </div>
    );
};

export default ContactForm;