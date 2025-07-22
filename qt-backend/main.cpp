
#include <QApplication>
#include <QWebEngineView>
#include <QWebChannel>
#include "bridge.h"

int main(int argc, char *argv[]) {
    QApplication app(argc, argv);
    // Remove window frame, title bar, system buttons
    QWebEngineView view;
    view.setWindowFlags(Qt::FramelessWindowHint);
    view.resize(1200, 800);
    qDebug()<<"main() start ...";
    QWebChannel *channel = new QWebChannel();
    Bridge *bridge = new Bridge();

    channel->registerObject(QStringLiteral("bridge"), bridge);

    view.page()->setWebChannel(channel);
    view.setUrl(QUrl("https://qt-web-app.surge.sh/"));  // Your React or HTML dev server

    view.show();
    QObject::connect(bridge, &Bridge::requestMinimize, [&view]() {
        view.showMinimized();
    });

    QObject::connect(bridge, &Bridge::requestMaximize, [&view]() {
        if (view.isMaximized())
            view.showNormal();
        else
            view.showMaximized();
    });
    QObject::connect(bridge, &Bridge::requestClose, [&view]() {
        view.close();
    });


    QObject::connect(bridge, &Bridge::requestLoadUrl, [&view](const QString &url) {
        QUrl qurl(url);
        if (qurl.isValid()) {
            qDebug() << "Loading URL from JS:" << qurl;
            view.setUrl(qurl);
        } else {
            qDebug() << "Invalid URL";
        }
    });
    QObject::connect(view.page(), &QWebEnginePage::titleChanged, bridge, &Bridge::updateTitle);

    return app.exec();
}
