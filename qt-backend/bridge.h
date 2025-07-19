
#ifndef BRIDGE_H
#define BRIDGE_H

#include <QObject>
#include <QString>
#include <QDebug>
#include <QMessageBox>
class Bridge : public QObject {
    Q_OBJECT
public:
    explicit Bridge(QObject *parent = nullptr);

public slots:
    void log(const QString &message);
    void showAlert(const QString &message);
    void closeWindow();

signals:
    void notify(const QString &message);
    void requestClose();

};

#endif // BRIDGE_H
