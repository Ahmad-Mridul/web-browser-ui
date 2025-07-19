
#include <QApplication>
#include <QWebEngineView>
#include <QWebChannel>
#include "bridge.h"

int main(int argc, char *argv[]) {
    QApplication app(argc, argv);

    QWebEngineView view;
    view.resize(1200, 800);
    qDebug()<<"main() start ...";
    QWebChannel *channel = new QWebChannel();
    Bridge *bridge = new Bridge();

    channel->registerObject(QStringLiteral("bridge"), bridge);

    view.page()->setWebChannel(channel);
    view.setUrl(QUrl("http://localhost:5173"));  // Your React or HTML dev server

    view.show();

    QObject::connect(bridge, &Bridge::requestClose, [&view]() {
        view.close();
    });

    return app.exec();
}
