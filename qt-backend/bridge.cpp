#include "bridge.h"

Bridge::Bridge(QObject *parent)
    : QObject{parent}
{
    qDebug()<<"bridge constr()";

}

void Bridge::log(const QString &message)
{
    qDebug() << "[JS] " << message;
}

void Bridge::showAlert(const QString &message)
{
    QMessageBox::information(nullptr, "Alert from JS", message);
}

void Bridge::closeWindow()
{
    emit requestClose();
}
