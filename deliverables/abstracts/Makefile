#
# Makefile for feupteses/feupthesis
#
# Version:   Sat May 17 22:36:50 2008
# Written by JCL
#

# orelse
#
# la­texmk com­pletely au­to­mates the pro­cess of gen­er­at­ing a LaTeX doc­u­ment. 
# Given the source files for a doc­u­ment, la­texmk is­sues the ap­pro­pri­ate 
# se­quence of com­mands to gen­er­ate a .dvi, .ps, .pdf or hard­copy ver­sion 
# of the doc­u­ment
#
# latexmk $TARGET.tex -bibtex -pdf -recorder -pvc

## Basename for result in PT
#TARGET=resumo

## Basename for result in EN
TARGET=abstract

## programs
LATEX=latex
PDFLATEX=pdflatex
BIBTEX=bibtex
DVIDVI=dvidvi -m '2:0(3mm,-14mm),1(193mm,-14mm)'
DVIPS=dvips -Ppdf
DVI2PS=dvips -t landscape -x 707
PS2PDF=ps2pdf -dEmbedAllFonts#true
MKIDX=makeindex

## .tex files
TEXFILES=$(wildcard *.tex **/*.tex)

## BibTeX files
BIB=$(wildcard *.bib)

## paper
PAPERSIZE=a4

main:	$(TARGET).pdf

index:
	$(MKIDX) $(TARGET)

biblio:
	$(BIBTEX) $(TARGET)

.tex.pdf:
	rm -f $(TARGET).pdf
	$(PDFLATEX) $< $@ || { rm -f $*.aux $*.idx && false ; }
	if grep 'There were undefined references' $*.log ; then \
	  $(BIBTEX) $(TARGET); $(PDFLATEX) $< $@; fi
	while grep 'Rerun to get cross-references right.' $*.log ; do \
	  $(PDFLATEX) $< $@ || { rm -f $*.aux $*.idx && false ; } ; done

.tex.dvi:
	rm -f $*.ps $*.pdf
	$(LATEX) $< || { rm -f $*.dvi $*.aux $*.idx && false ; }
	if grep 'There were undefined references' $*.log ; then \
	  $(BIBTEX) $(TARGET); $(LATEX) $< $@; fi
	while grep 'Rerun to get cross-references right.' $*.log ; do \
	  $(LATEX) $< || { rm -f $*.dvi $*.aux $*.idx && false ; } ; done

.dvi.ps:
	$(DVIPS) -t $(PAPERSIZE) $< -o $@

.dvi.dvi2:
	$(DVIDVI) $< $@

.dvi2.ps2:
	$(DVI2PS) $< -o $@

.ps.pdf:
	$(PS2PDF) $< $@

$(TARGET).pdf:	  $(TEXFILES)
$(TARGET).dvi:	  $(TEXFILES)
$(TARGET).ps:	  $(TARGET).dvi
$(TARGET).ps2:	  $(TARGET).dvi2
$(TARGET).dvi2:	  $(TARGET).dvi

## Extensions
EXTS=aux toc idx ind ilg log out lof lot lol bbl blg

##clean
clean:
	for EXT in ${EXTS}; do \
	  find `pwd` -name \*\.$${EXT} -exec rm -v \{\} \; ; done

##show PDF
display: $(TARGET).pdf
	acroread $(TARGET).pdf &

### misc
.SUFFIXES: .tex .aux .toc .lof .lot .log .dvi .dvi2 .ps .ps2 .pdf .bib .bbl
