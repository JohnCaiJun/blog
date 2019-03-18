---
title: Kubernetes
date: 2019-03-11 23:05:36
categories: 运维
tags: Doker
---

## 部署k8s
1. etcd
2. kubernetes-master

```bash
systemctl start apiserver , kube-controller-manager kube-scheduler
```
3. 节点

```bash
systemctl start flanneld docker kube-proxy kubelet
```



