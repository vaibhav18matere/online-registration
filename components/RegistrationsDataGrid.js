"use client";

import { useMemo, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Box,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FolderOpenOutlinedIcon from "@mui/icons-material/FolderOpenOutlined";
import { ADMISSION_DOCUMENTS } from "../lib/documents";
import { DocumentActions } from "./DocumentActions";

function getUploadedDocuments(registration) {
  return ADMISSION_DOCUMENTS.filter((doc) => registration[doc.dbColumn]);
}

function getDocumentFileEntries(registration) {
  return getUploadedDocuments(registration).map((doc) => ({
    id: doc.dbColumn,
    label: doc.label,
    url: registration[doc.dbColumn],
    downloadLabel: doc.label,
  }));
}

function getPaymentScreenshotFileEntries(registration) {
  if (!registration.payment_screenshot_url) {
    return [];
  }

  return [
    {
      id: "payment_screenshot",
      label: "Payment Screenshot",
      url: registration.payment_screenshot_url,
      downloadLabel: "payment-screenshot",
    },
  ];
}

function RegistrationFilesDialog({ registration, title, subtitle, files, emptyMessage, open, onClose }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      scroll="paper"
      onClick={(event) => event.stopPropagation()}
      PaperProps={{
        sx: {
          bgcolor: "background.paper",
          backgroundImage: "none",
          border: "1px solid rgba(59, 130, 246, 0.3)",
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 2,
          pr: 6,
          pb: 1,
        }}
      >
        <Box>
          <Typography component="span" variant="h6" sx={{ display: "block", fontWeight: 700 }}>
            {title}
          </Typography>
          {registration && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              {registration.full_name}
              {registration.mobile ? ` · ${registration.mobile}` : ""}
              {subtitle ? ` · ${subtitle}` : ""}
            </Typography>
          )}
        </Box>
        <IconButton
          aria-label={`Close ${title.toLowerCase()}`}
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 12,
            top: 12,
            color: "text.secondary",
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ px: 0, py: 0 }}>
        {files.length === 0 ? (
          <Typography variant="body2" color="text.secondary" sx={{ px: 3, py: 3 }}>
            {emptyMessage}
          </Typography>
        ) : (
          <Box component="ul" sx={{ listStyle: "none", m: 0, p: 0 }}>
            {files.map((file, index) => (
              <Box
                component="li"
                key={file.id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 2,
                  px: 3,
                  py: 1.75,
                  borderBottom:
                    index < files.length - 1 ? "1px solid rgba(45, 74, 111, 0.45)" : "none",
                  "&:hover": {
                    bgcolor: "rgba(59, 130, 246, 0.06)",
                  },
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 600,
                    flex: 1,
                    minWidth: 0,
                    lineHeight: 1.4,
                  }}
                >
                  {file.label}
                </Typography>
                <DocumentActions url={file.url} label={file.downloadLabel} compact={false} />
              </Box>
            ))}
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
}

function FilePreviewCell({ fileCount, ariaLabel, onOpen }) {
  if (fileCount === 0) {
    return <Typography variant="body2" color="text.secondary">—</Typography>;
  }

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, py: 0.5 }}>
      <Chip
        label={fileCount === 1 ? "1 uploaded" : `${fileCount} uploaded`}
        size="small"
        color="primary"
        variant="outlined"
        sx={{ fontSize: "0.7rem", height: 24 }}
      />
      <IconButton
        size="small"
        aria-label={ariaLabel}
        onClick={(event) => {
          event.stopPropagation();
          onOpen();
        }}
        sx={{
          color: "primary.light",
          border: "1px solid rgba(59, 130, 246, 0.35)",
          width: 28,
          height: 28,
        }}
      >
        <FolderOpenOutlinedIcon sx={{ fontSize: 16 }} />
      </IconButton>
    </Box>
  );
}

function StatusChip({ status }) {
  const colorMap = {
    draft: "default",
    submitted: "primary",
    under_review: "info",
    approved: "success",
    rejected: "error",
  };

  return (
    <Chip
      label={status?.replace("_", " ") || "unknown"}
      size="small"
      color={colorMap[status] || "default"}
      variant="outlined"
      sx={{ textTransform: "capitalize" }}
    />
  );
}

export function RegistrationsDataGrid({ registrations }) {
  const [filesModal, setFilesModal] = useState(null);

  function openFilesModal(registration, modalConfig) {
    setFilesModal({
      registration,
      ...modalConfig,
    });
  }

  function closeFilesModal() {
    setFilesModal(null);
  }

  const rows = useMemo(
    () =>
      registrations.map((registration) => ({
        ...registration,
        city_state: [registration.city, registration.state].filter(Boolean).join(", "),
      })),
    [registrations]
  );

  const columns = useMemo(
    () => [
      {
        field: "created_at",
        headerName: "Submitted",
        width: 170,
        valueFormatter: (value) => (value ? new Date(value).toLocaleString() : "—"),
      },
      {
        field: "full_name",
        headerName: "Full Name",
        minWidth: 150,
        flex: 1,
      },
      {
        field: "status",
        headerName: "Status",
        width: 130,
        renderCell: (params) => <StatusChip status={params.value} />,
      },
      {
        field: "mobile",
        headerName: "Mobile",
        width: 120,
      },
      {
        field: "email",
        headerName: "Email",
        minWidth: 180,
        flex: 1,
      },
      {
        field: "city_state",
        headerName: "City / State",
        minWidth: 140,
        flex: 1,
      },
      {
        field: "pcb_total",
        headerName: "PCB",
        width: 80,
        type: "number",
        valueFormatter: (value) => (value != null ? value : "—"),
      },
      {
        field: "neet_score",
        headerName: "NEET",
        width: 80,
        type: "number",
        valueFormatter: (value) => (value != null ? value : "—"),
      },
      {
        field: "payment_mode",
        headerName: "Payment",
        width: 100,
      },
      {
        field: "utr_number",
        headerName: "UTR",
        width: 120,
        valueFormatter: (value) => value || "—",
      },
      {
        field: "payment_screenshot_url",
        headerName: "Payment Screenshot",
        width: 200,
        sortable: false,
        renderCell: (params) => {
          const files = getPaymentScreenshotFileEntries(params.row);

          return (
            <FilePreviewCell
              fileCount={files.length}
              ariaLabel="View payment screenshot"
              onOpen={() =>
                openFilesModal(params.row, {
                  title: "Payment screenshot",
                  subtitle: [params.row.payment_mode, params.row.utr_number]
                    .filter(Boolean)
                    .join(" · "),
                  files,
                  emptyMessage: "No payment screenshot uploaded.",
                })
              }
            />
          );
        },
      },
      {
        field: "documents",
        headerName: "Documents",
        width: 200,
        sortable: false,
        filterable: false,
        renderCell: (params) => {
          const files = getDocumentFileEntries(params.row);

          return (
            <FilePreviewCell
              fileCount={files.length}
              ariaLabel={`View ${files.length} documents`}
              onOpen={() =>
                openFilesModal(params.row, {
                  title: "Uploaded documents",
                  subtitle: "",
                  files,
                  emptyMessage: "No documents uploaded.",
                })
              }
            />
          );
        },
      },
    ],
    []
  );

  if (rows.length === 0) {
    return (
      <Box
        sx={{
          py: 8,
          textAlign: "center",
          borderRadius: 2,
          border: "1px solid",
          borderColor: "divider",
          bgcolor: "background.paper",
        }}
      >
        <Typography variant="h6" gutterBottom>
          No submissions yet
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Applications will appear here once students register.
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <Box
        sx={{
          width: "100%",
          borderRadius: 2,
          overflow: "hidden",
          border: "1px solid",
          borderColor: "rgba(59, 130, 246, 0.25)",
          bgcolor: "background.paper",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.35)",
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            bgcolor: "rgba(15, 40, 71, 0.95)",
            borderBottom: "1px solid rgba(59, 130, 246, 0.3)",
          },
          "& .MuiDataGrid-row:hover": {
            bgcolor: "rgba(59, 130, 246, 0.08)",
          },
          "& .MuiDataGrid-cell": {
            borderColor: "rgba(45, 74, 111, 0.5)",
            display: "flex",
            alignItems: "center",
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "1px solid rgba(59, 130, 246, 0.2)",
          },
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          getRowId={(row) => row.id}
          rowHeight={52}
          disableRowSelectionOnClick
          initialState={{
            sorting: {
              sortModel: [{ field: "created_at", sort: "desc" }],
            },
            pagination: { paginationModel: { pageSize: 10 } },
          }}
          pageSizeOptions={[10, 25, 50]}
          sortingOrder={["asc", "desc"]}
          sx={{
            minHeight: 420,
            color: "text.primary",
            "--DataGrid-overlayHeight": "300px",
          }}
        />
      </Box>

      <RegistrationFilesDialog
        registration={filesModal?.registration ?? null}
        title={filesModal?.title ?? ""}
        subtitle={filesModal?.subtitle ?? ""}
        files={filesModal?.files ?? []}
        emptyMessage={filesModal?.emptyMessage ?? "No files uploaded."}
        open={filesModal !== null}
        onClose={closeFilesModal}
      />
    </>
  );
}
