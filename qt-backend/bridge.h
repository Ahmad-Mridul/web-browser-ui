// bridge.h
#ifndef BRIDGE_H
#define BRIDGE_H

#include <QObject>
#include <QString>
#include <QDebug>
#include <QMessageBox>
class Bridge : public QObject {
    Q_OBJECT
public:
    explicit Bridge(QObject *parent = nullptr) : QObject(parent) {}

public slots:
    void log(const QString &message) {
        qDebug() << "[JS] " << message;

    }
    void showAlert(const QString &message) {
        QMessageBox::information(nullptr, "Alert from JS", message);
    }

signals:
    void notify(const QString &message);
};

#endif // BRIDGE_H
