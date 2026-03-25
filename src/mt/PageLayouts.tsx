"use client";

import { ArrowLeft, Plus } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "../lib/utils";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";

// 基础页面布局属性
interface BasePageLayoutProps {
  children: ReactNode;
  className?: string;
}

// 页面头部属性
interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: ReactNode;
  backButton?: {
    onClick: () => void;
    text?: string;
  };
  breadcrumbs?: Array<{
    label: string;
    href?: string;
    onClick?: () => void;
  }>;
  className?: string;
}

/**
 * 通用页面头部组件
 */
export function PageHeader({ title, description, actions, backButton, breadcrumbs, className }: PageHeaderProps) {
  return (
    <div data-slot="page-header" className={cn("space-y-4", className)}>
      {/* 面包屑导航 */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
          {breadcrumbs.map((crumb, index) => (
            <div key={`${crumb.label}-${index}`} className="flex items-center space-x-2">
              {index > 0 && <span>/</span>}
              {crumb.href || crumb.onClick ? (
                <button type="button" onClick={crumb.onClick} className="hover:text-foreground transition-colors">
                  {crumb.label}
                </button>
              ) : (
                <span className="text-foreground">{crumb.label}</span>
              )}
            </div>
          ))}
        </nav>
      )}

      {/* 页面标题和操作 */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          {backButton && (
            <Button variant="ghost" size="sm" onClick={backButton.onClick} className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              {backButton.text || "返回"}
            </Button>
          )}
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">{title}</h1>
            {description && <p className="text-muted-foreground mt-1">{description}</p>}
          </div>
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
    </div>
  );
}

// 管理页面布局属性
interface ManagementPageLayoutProps extends BasePageLayoutProps {
  title: string;
  description?: string;
  onAdd?: () => void;
  addButtonText?: string;
  addButtonIcon?: ReactNode;
  headerActions?: ReactNode;
  stats?: ReactNode;
  filters?: ReactNode;
}

/**
 * 管理页面布局组件
 * 标准的管理页面布局：头部 + 统计卡片 + 过滤器 + 内容
 */
export function ManagementPageLayout({
  title,
  description,
  onAdd,
  addButtonText = "添加",
  addButtonIcon = <Plus className="h-4 w-4" />,
  headerActions,
  stats,
  filters,
  children,
  className,
}: ManagementPageLayoutProps) {
  const actions = (
    <>
      {headerActions}
      {onAdd && (
        <Button onClick={onAdd}>
          {addButtonIcon}
          <span className="ml-2">{addButtonText}</span>
        </Button>
      )}
    </>
  );

  return (
    <div data-slot="management-page-layout" className={cn("space-y-6", className)}>
      <PageHeader title={title} description={description} actions={actions} />

      {stats && (
        <>
          {stats}
          <Separator />
        </>
      )}

      {filters && (
        <>
          {filters}
          <Separator />
        </>
      )}

      {children}
    </div>
  );
}

// 表单页面布局属性
interface FormPageLayoutProps extends BasePageLayoutProps {
  title: string;
  description?: string;
  backButton?: {
    onClick: () => void;
    text?: string;
  };
  breadcrumbs?: PageHeaderProps["breadcrumbs"];
  cardTitle?: string;
  cardDescription?: string;
  actions?: ReactNode;
}

/**
 * 表单页面布局组件
 * 标准的表单页面布局：头部 + 表单卡片
 */
export function FormPageLayout({
  title,
  description,
  backButton,
  breadcrumbs,
  cardTitle,
  cardDescription,
  actions,
  children,
  className,
}: FormPageLayoutProps) {
  return (
    <div data-slot="form-page-layout" className={cn("space-y-6", className)}>
      <PageHeader
        title={title}
        description={description}
        backButton={backButton}
        breadcrumbs={breadcrumbs}
        actions={actions}
      />

      <Card>
        {(cardTitle || cardDescription) && (
          <CardHeader>
            {cardTitle && <CardTitle>{cardTitle}</CardTitle>}
            {cardDescription && <CardDescription>{cardDescription}</CardDescription>}
          </CardHeader>
        )}
        <CardContent>{children}</CardContent>
      </Card>
    </div>
  );
}

// 详情页面布局属性
interface DetailPageLayoutProps extends BasePageLayoutProps {
  title: string;
  description?: string;
  backButton?: {
    onClick: () => void;
    text?: string;
  };
  breadcrumbs?: PageHeaderProps["breadcrumbs"];
  actions?: ReactNode;
  tabs?: ReactNode;
}

/**
 * 详情页面布局组件
 * 标准的详情页面布局：头部 + 操作按钮 + 标签页 + 内容
 */
export function DetailPageLayout({
  title,
  description,
  backButton,
  breadcrumbs,
  actions,
  tabs,
  children,
  className,
}: DetailPageLayoutProps) {
  return (
    <div data-slot="detail-page-layout" className={cn("space-y-6", className)}>
      <PageHeader
        title={title}
        description={description}
        backButton={backButton}
        breadcrumbs={breadcrumbs}
        actions={actions}
      />

      {tabs && (
        <>
          {tabs}
          <Separator />
        </>
      )}

      {children}
    </div>
  );
}

// 简单页面布局
interface SimplePageLayoutProps extends BasePageLayoutProps {
  title: string;
  description?: string;
  actions?: ReactNode;
  backButton?: {
    onClick: () => void;
    text?: string;
  };
  breadcrumbs?: PageHeaderProps["breadcrumbs"];
}

/**
 * 简单页面布局组件
 * 最基础的页面布局：头部 + 内容
 */
export function SimplePageLayout({
  title,
  description,
  actions,
  backButton,
  breadcrumbs,
  children,
  className,
}: SimplePageLayoutProps) {
  return (
    <div data-slot="simple-page-layout" className={cn("space-y-6", className)}>
      <PageHeader
        title={title}
        description={description}
        actions={actions}
        backButton={backButton}
        breadcrumbs={breadcrumbs}
      />
      {children}
    </div>
  );
}

// 导出所有组件的类型
export type {
  PageHeaderProps,
  ManagementPageLayoutProps,
  FormPageLayoutProps,
  DetailPageLayoutProps,
  SimplePageLayoutProps,
  BasePageLayoutProps,
};
