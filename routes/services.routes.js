const { Router } = require('express');
const Service = require('../models/Service');
const { checkSchema, validationResult } = require('express-validator');
const nodemailer = require("nodemailer");
const moment = require('moment');


const router = Router();

router.get('/', async (req, res) => {
    try {
        const serviсes = await Service.find({});

        if (serviсes) {
            res.json(serviсes);
        }

    } catch (e) {
        res.status(500).json({ message: 'Ошибка при чтении списка туруслуг' });
    }
});


router.post('/rate', checkSchema({
    phone: {
        id: {
            errorMessage: 'Некорректные данные',
            options: [/^[a-f\d]{24}$/i]
        }
    },
    rate: {
        isInt: {
            errorMessage: 'Некорректные данные',
            options: { min: 0, max: 4 }
        }
    }
}), async (req, res) => {
    try {

        const { id, rate } = req.body;

        const service = await Service.findById(id);

        if (service) {

            service.rating = service.rating.map((r, i) => i === rate - 1 ? ++r : r);

            await service.save();

            res.json(service.rating);
        }

    } catch (e) {
        res.status(500).json({
            message: 'Ошибка при сохранении рейтинга'
        });
    }
});

router.post('/reserve', checkSchema({
    startDate: {
        notEmpty: {
            errorMessage: 'Не задана дата начала'
        },
        isISO8601: {
            errorMessage: 'Некорректная дата начала',
        }
    },
    endDate: {
        notEmpty: {
            errorMessage: 'Не задана дата окончания'
        },
        isISO8601: {
            errorMessage: 'Некорректная дата окончания',
        }
    },
    touristsCount: {
        notEmpty: {
            errorMessage: 'Не задано количество туристов'
        },
        isInt: {
            errorMessage: 'Некорректное количество туристов',
            options: { min: 1, max: 150 }
        }
    },
    services: {
        notEmpty: {
            errorMessage: 'Не задан список туруслуг'
        },
        isArray: {
            errorMessage: 'Некорректный список туруслуг'
        }
    },
    email: {
        notEmpty: {
            errorMessage: 'Пожалуйста, введите email'
        },
        isEmail: {
            errorMessage: 'Пожалуйста, введите корректный email',
        },
        normalizeEmail: true,
        trim: true
    },
    phone: {
        notEmpty: {
            errorMessage: 'Пожалуйста, укажите номер телефона'
        },
        matches: {
            options: [/^([(][0-9]{3}[)][\s][0-9]{3}[-][0-9]{2}[-][0-9]{2})*$/],
            errorMessage: "Пожалуйста, введите корректный номер"
        },
        trim: true
    },
    client: {
        notEmpty: {
            errorMessage: 'Пожалуйста, укажите имя'
        },
        matches: {
            options: [/^[А-Яа-яA-Za-z\s]*$/],
            errorMessage: "Пожалуйста, введите корректное имя"
        },
        trim: true
    },
    company: {
        matches: {
            options: [/^[0-9А-Яа-яA-Za-z\s]*$/],
            errorMessage: "Пожалуйста, введите корректное название"
        },
        isLength: {
            options: { max: 100 },
            errorMessage: 'Название не должно превышать 100 знаков'
        },
        trim: true
    },
    comment: {
        matches: {
            options: [/^[0-9А-Яа-яA-Za-z\s]*$/],
            errorMessage: "Пожалуйста, введите корректный комментарий"
        },
        isLength: {
            options: { max: 250 },
            errorMessage: 'Комментарий не должен превышать 250 знаков'
        },
        trim: true
    },
    subscription: {
        isBoolean: true,
        errorMessage: 'Некорректное значение'
    }
}), async (req, res) => {
    try {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {

            return res.status(400).json({
                validationErrors: errors.array(),
                message: 'Некорректные данные формы'
            })
        }

        const { email, phone, client, company, comment, subscription } = req.body;
        const { startDate, endDate, touristsCount, services } = req.body;

        const notification = `
        <p>Получен запрос на бронирование туруслуг:</p>
        <h3>Информация о клиенте</h3>
        <ul>  
          <li>${client} (${company || 'Ч/Л'})</li>          
          <li>
            <a href="mailto:${email}">${email}</a>, 
            <a href="tel:+7${phone.replace(/\D+/g, '')}">+7 ${phone}</a></li>
          <li>Группа ${touristsCount} чел</li>
        </ul>
        <h3>Дата и время</h3>
        <ul>  
          <li>${moment(startDate).format('Приезд DD.MM.YYYY в HH:mm')}</li>
          <li>${moment(endDate).format('Отъезд DD.MM.YYYY в HH:mm')}</li>
        </ul>
        <h3>Выбранные услуги</h3>
        <ol>
            <li>${services.join('</li>\n<li>')}</li>
        </ol>
        <h3>Вопросы и комментарии</h3>
        <p>${comment || 'Нет'}</p>
      `;

        let testAccount = await nodemailer.createTestAccount();

        let transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false,
            auth: {
                user: testAccount.user,
                pass: testAccount.pass
            }
        });

        let info = await transporter.sendMail({
            from: 'ТурИнфоЦентр <turinfocentr.ru@gmail.com>',
            to: 'yaroslav.project14@gmail.com',
            subject: 'Запрос на бронирование тура',
            html: notification
        })

        console.log('accepted', info.accepted.toString());

        //console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        res.json({ email, phone, client, company, comment, subscription });

    } catch (e) {
        res.status(500).json({
            message: 'Ошибка при отправке запроса'
        });
    }
});

module.exports = router;