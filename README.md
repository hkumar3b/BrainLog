# 🧠 BrainLog

**BrainLog** is a full-stack productivity tool that helps developers capture, organize, and revise their learning history effortlessly.

While solving problems, reading blogs, or having insightful discussions online, we often lose track of what we learned. BrainLog solves this by automatically capturing important links and storing them in a structured system, allowing users to revisit and revise their knowledge anytime.

The system uses a **Chrome Extension** to capture URLs (title, link, timestamp, and category) with a single click and sends them to a backend powered by **NestJS**. All data is securely stored in **PostgreSQL** using **Prisma ORM**. A **React + Tailwind dashboard** then provides a powerful revision interface where users can review their learning across different time ranges such as daily, weekly, monthly, yearly, or custom ranges.

BrainLog is designed to function as a **personal knowledge log for developers**, ensuring that valuable insights, problem-solving sessions, and learning resources are never forgotten.

---

## 🚀 Features

* ⚡ **One-Click Capture**
  Save any webpage instantly using the Chrome extension.

* 🗂 **Custom Categories**
  Organize links into categories like DSA, Blogs, Work, Ideas, or create your own.

* 📅 **Flexible Revision System**
  Review saved items by:

  * Day
  * Week
  * Month
  * Year
  * Custom date range

* ✅ **Revision Tracking**
  Mark items as revised to track what you've already reviewed.

* 🔐 **Authentication**
  Secure user accounts using JWT-based authentication.

* 🐳 **Dockerized Environment**
  Easy development setup with Docker and Docker Compose.

---
## System Architecture Diagram
                ┌──────────────────────┐
                │   Chrome Extension   │
                │  (URL Collector)     │
                └──────────┬───────────┘
                           │
                           │  POST /items
                           │
                    ┌──────▼──────┐
                    │   NestJS    │
                    │   Backend   │
                    │  (API + Auth)│
                    └──────┬──────┘
                           │
                    Prisma ORM
                           │
                    ┌──────▼──────┐
                    │ PostgreSQL  │
                    │  Database   │
                    └──────┬──────┘
                           │
                           │
                  ┌────────▼────────┐
                  │ React Dashboard │
                  │ (Revision UI)   │
                  └─────────────────┘

## 🏗 Tech Stack

**Frontend**

* React
* Tailwind CSS

**Backend**

* NestJS
* Prisma ORM

**Database**

* PostgreSQL

**Collector**

* Chrome Extension

**DevOps**

* Docker

---

## 🎯 Vision

BrainLog aims to become a **developer’s second brain**, helping users capture knowledge instantly and build a long-term learning memory system.

Instead of forgetting what you solved or learned last week, BrainLog ensures every valuable insight is logged, organized, and easy to revisit.

---

## 📌 Status

Currently under active development.
