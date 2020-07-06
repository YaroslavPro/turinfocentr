const { Router } = require('express');
const router = Router();

router.get('/', async (req, res) => {
    try {

        const events = [
            {
                city: 'Лихославль',
                cityLink: 'http://lihoslavl.turinfocentr.ru',
                title: 'Фестиваль карельского пирога "Калитка"',
                description: 'Калитки - пироги с историей, насчитывающей не одну сотню лет. И эта история развернется перед вашими глазами: в балладах сказителей-рунопевцев, в национальных песнях и танцах, в выступлениях реконструкторов.',
                link: 'http://lihoslavl.turinfocentr.ru/sobytija/sobytie4/'

            }, {
                city: 'Лихославль',
                cityLink: 'http://lihoslavl.turinfocentr.ru',
                title: 'День Кегри - карельский праздник урожая',
                description: 'Приглашаем на исконный карельский праздник, пришедший к нам из глубины веков. Ходит в этот день грозный Кегри по избам, спрашивет с хозяев: хорошо ли трудились, не ленились ли - добрым хозяевам бояться нечего, а вот нерадивых и наказать может.',
                link: 'http://lihoslavl.turinfocentr.ru/sobytija/sobytie2/'
            }, {
                city: 'Лихославль',
                cityLink: 'http://lihoslavl.turinfocentr.ru',
                title: 'Купальская ночь у тверских карел',
                description: 'Таинственный отблеск костра в чистейших водах Медведицы, тихое звучание кантеле в руках карельского сказителя-рунопевца, пьянящий аромат луговых трав и ощущение настоящего чуда..',
                link: 'http://lihoslavl.turinfocentr.ru/sobytija/sobytie3/'
            }, {
                city: 'Лихославль',
                cityLink: 'http://lihoslavl.turinfocentr.ru',
                title: 'Карельский Новый год: пир у Луми Тайкури',
                description: 'Согласно карельским традициям этот день определяет, каким будет весь предстоящий год, а значит, провести его нужно не просто весело, а так, чтобы столы ломились от угощений – тогда и год будет изобильным!',
                link: 'http://lihoslavl.turinfocentr.ru/sobytija/sobytie1/'
            }
        ];

        if (events) {
            res.json(events);
        }

    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
    }
});

module.exports = router;