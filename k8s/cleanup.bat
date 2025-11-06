@echo off

echo Cleaning up Kubernetes resources...
kubectl delete namespace ntodo

echo Cleanup complete!